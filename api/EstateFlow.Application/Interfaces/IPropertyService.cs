using EstateFlow.Domain.Entities;

namespace EstateFlow.Application.Interfaces;

public interface IPropertyService
{
    Task<Property?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
}
