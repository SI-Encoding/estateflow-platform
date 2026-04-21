using EstateFlow.Domain.Constants;
using EstateFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EstateFlow.Infrastructure.Persistence;

public class ApplicationDbContextInitializer
{
    private readonly ApplicationDbContext _dbContext;

    public ApplicationDbContextInitializer(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken = default)
    {
        await _dbContext.Database.EnsureCreatedAsync(cancellationToken);
        await SeedRolesAsync(cancellationToken);
    }

    private async Task SeedRolesAsync(CancellationToken cancellationToken)
    {
        var existingRoles = await _dbContext.Roles
            .Select(role => role.Name)
            .ToListAsync(cancellationToken);

        var rolesToSeed = SystemRoles.All
            .Where(roleName => existingRoles.All(existingRole => !string.Equals(existingRole, roleName, StringComparison.OrdinalIgnoreCase)))
            .Select(roleName => new Role
            {
                Id = SystemRoles.GetId(roleName),
                Name = roleName
            })
            .ToList();

        if (rolesToSeed.Count == 0)
        {
            return;
        }

        _dbContext.Roles.AddRange(rolesToSeed);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
