using EstateFlow.Application.Common.Dtos;
using EstateFlow.Application.Interfaces;
using EstateFlow.Application.Properties.Dtos;
using EstateFlow.Domain.Constants;
using EstateFlow.Domain.Entities;
using EstateFlow.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EstateFlow.Infrastructure.Services;

public class PropertyService : IPropertyService
{
    private readonly ApplicationDbContext _dbContext;

    public PropertyService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PagedResultDto<PropertyResponseDto>> GetPagedAsync(
        PropertyQueryDto query,
        CancellationToken cancellationToken = default)
    {
        var pageNumber = query.PageNumber < 1 ? 1 : query.PageNumber;
        var pageSize = query.PageSize < 1 ? 10 : Math.Min(query.PageSize, 100);

        IQueryable<Property> properties = _dbContext.Properties.AsNoTracking();

        if (query.MinPrice.HasValue)
        {
            properties = properties.Where(property => property.Price >= query.MinPrice.Value);
        }

        if (query.MaxPrice.HasValue)
        {
            properties = properties.Where(property => property.Price <= query.MaxPrice.Value);
        }

        if (!string.IsNullOrWhiteSpace(query.Address))
        {
            var address = query.Address.Trim().ToLower();
            properties = properties.Where(property => property.Address.ToLower().Contains(address));
        }

        if (!string.IsNullOrWhiteSpace(query.PropertyType))
        {
            var propertyType = query.PropertyType.Trim().ToLower();
            properties = properties.Where(property => property.PropertyType.ToLower() == propertyType);
        }

        properties = ApplySorting(properties, query.SortBy, query.SortOrder);

        var totalCount = await properties.CountAsync(cancellationToken);
        var items = await properties
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(property => new PropertyResponseDto
            {
                Id = property.Id,
                Price = property.Price,
                Address = property.Address,
                Description = property.Description,
                Bedrooms = property.Bedrooms,
                Bathrooms = property.Bathrooms,
                PropertyType = property.PropertyType,
                CreatedAt = property.CreatedAt,
                AgentId = property.AgentId
            })
            .ToListAsync(cancellationToken);

        return new PagedResultDto<PropertyResponseDto>
        {
            Items = items,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = totalCount == 0 ? 0 : (int)Math.Ceiling(totalCount / (double)pageSize)
        };
    }

    public async Task<PropertyResponseDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Properties
            .AsNoTracking()
            .Where(property => property.Id == id)
            .Select(property => new PropertyResponseDto
            {
                Id = property.Id,
                Price = property.Price,
                Address = property.Address,
                Description = property.Description,
                Bedrooms = property.Bedrooms,
                Bathrooms = property.Bathrooms,
                PropertyType = property.PropertyType,
                CreatedAt = property.CreatedAt,
                AgentId = property.AgentId
            })
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<PropertyResponseDto> CreateAsync(
        CreatePropertyRequestDto request,
        Guid currentUserId,
        string currentUserRole,
        CancellationToken cancellationToken = default)
    {
        ValidateRequest(request.Price, request.Address, request.Description, request.Bedrooms, request.Bathrooms, request.PropertyType);
        EnsureWriteAccess(currentUserRole);

        var property = new Property
        {
            Price = request.Price,
            Address = request.Address.Trim(),
            Description = request.Description.Trim(),
            Bedrooms = request.Bedrooms,
            Bathrooms = request.Bathrooms,
            PropertyType = request.PropertyType.Trim(),
            AgentId = currentUserId,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Properties.Add(property);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToResponse(property);
    }

    public async Task<PropertyResponseDto?> UpdateAsync(
        Guid id,
        UpdatePropertyRequestDto request,
        Guid currentUserId,
        string currentUserRole,
        CancellationToken cancellationToken = default)
    {
        ValidateRequest(request.Price, request.Address, request.Description, request.Bedrooms, request.Bathrooms, request.PropertyType);
        EnsureWriteAccess(currentUserRole);

        var property = await _dbContext.Properties.FirstOrDefaultAsync(candidate => candidate.Id == id, cancellationToken);

        if (property is null)
        {
            return null;
        }

        EnsureOwnership(property, currentUserId, currentUserRole);

        property.Price = request.Price;
        property.Address = request.Address.Trim();
        property.Description = request.Description.Trim();
        property.Bedrooms = request.Bedrooms;
        property.Bathrooms = request.Bathrooms;
        property.PropertyType = request.PropertyType.Trim();
        property.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToResponse(property);
    }

    public async Task<bool> DeleteAsync(
        Guid id,
        Guid currentUserId,
        string currentUserRole,
        CancellationToken cancellationToken = default)
    {
        EnsureWriteAccess(currentUserRole);

        var property = await _dbContext.Properties.FirstOrDefaultAsync(candidate => candidate.Id == id, cancellationToken);

        if (property is null)
        {
            return false;
        }

        EnsureOwnership(property, currentUserId, currentUserRole);

        _dbContext.Properties.Remove(property);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static IQueryable<Property> ApplySorting(IQueryable<Property> properties, string? sortBy, string? sortOrder)
    {
        var normalizedSortBy = sortBy?.Trim().ToLowerInvariant();
        var isDescending = string.Equals(sortOrder, "desc", StringComparison.OrdinalIgnoreCase);

        return normalizedSortBy switch
        {
            "price" => isDescending
                ? properties.OrderByDescending(property => property.Price)
                : properties.OrderBy(property => property.Price),
            _ => isDescending
                ? properties.OrderByDescending(property => property.CreatedAt)
                : properties.OrderBy(property => property.CreatedAt)
        };
    }

    private static PropertyResponseDto MapToResponse(Property property)
    {
        return new PropertyResponseDto
        {
            Id = property.Id,
            Price = property.Price,
            Address = property.Address,
            Description = property.Description,
            Bedrooms = property.Bedrooms,
            Bathrooms = property.Bathrooms,
            PropertyType = property.PropertyType,
            CreatedAt = property.CreatedAt,
            AgentId = property.AgentId
        };
    }

    private static void ValidateRequest(
        decimal price,
        string address,
        string description,
        int bedrooms,
        int bathrooms,
        string propertyType)
    {
        if (price <= 0)
        {
            throw new InvalidOperationException("Price must be greater than zero.");
        }

        if (string.IsNullOrWhiteSpace(address))
        {
            throw new InvalidOperationException("Address is required.");
        }

        if (string.IsNullOrWhiteSpace(description))
        {
            throw new InvalidOperationException("Description is required.");
        }

        if (bedrooms < 0 || bathrooms < 0)
        {
            throw new InvalidOperationException("Bedrooms and bathrooms cannot be negative.");
        }

        if (string.IsNullOrWhiteSpace(propertyType))
        {
            throw new InvalidOperationException("Property type is required.");
        }
    }

    private static void EnsureWriteAccess(string currentUserRole)
    {
        if (!string.Equals(currentUserRole, SystemRoles.Agent, StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(currentUserRole, SystemRoles.Admin, StringComparison.OrdinalIgnoreCase))
        {
            throw new UnauthorizedAccessException("Only agents and admins can manage properties.");
        }
    }

    private static void EnsureOwnership(Property property, Guid currentUserId, string currentUserRole)
    {
        if (string.Equals(currentUserRole, SystemRoles.Admin, StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        if (property.AgentId != currentUserId)
        {
            throw new UnauthorizedAccessException("You can only manage your own properties.");
        }
    }
}
