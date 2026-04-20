using EstateFlow.Domain.Entities;

namespace EstateFlow.Application.Interfaces;

public interface IUserService
{
    Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
}
