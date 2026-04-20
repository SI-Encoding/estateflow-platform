using EstateFlow.Application.Interfaces;
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

    public Task<Property?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return _dbContext.Properties
            .Include(property => property.Agent)
            .ThenInclude(agent => agent!.Role)
            .FirstOrDefaultAsync(property => property.Id == id, cancellationToken);
    }
}
