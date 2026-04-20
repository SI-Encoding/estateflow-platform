using EstateFlow.Application.Interfaces;
using EstateFlow.Domain.Entities;
using EstateFlow.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EstateFlow.Infrastructure.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _dbContext;

    public UserService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return _dbContext.Users
            .Include(user => user.Role)
            .FirstOrDefaultAsync(user => user.Id == id, cancellationToken);
    }
}
