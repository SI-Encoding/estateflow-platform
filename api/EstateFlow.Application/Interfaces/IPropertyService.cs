using EstateFlow.Application.Common.Dtos;
using EstateFlow.Application.Properties.Dtos;

namespace EstateFlow.Application.Interfaces;

public interface IPropertyService
{
    Task<PagedResultDto<PropertyResponseDto>> GetPagedAsync(
        PropertyQueryDto query,
        CancellationToken cancellationToken = default);

    Task<PropertyResponseDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<PropertyResponseDto> CreateAsync(
        CreatePropertyRequestDto request,
        Guid currentUserId,
        string currentUserRole,
        CancellationToken cancellationToken = default);

    Task<PropertyResponseDto?> UpdateAsync(
        Guid id,
        UpdatePropertyRequestDto request,
        Guid currentUserId,
        string currentUserRole,
        CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(
        Guid id,
        Guid currentUserId,
        string currentUserRole,
        CancellationToken cancellationToken = default);
}
