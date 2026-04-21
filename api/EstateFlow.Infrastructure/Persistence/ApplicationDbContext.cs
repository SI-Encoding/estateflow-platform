using EstateFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EstateFlow.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Role> Roles => Set<Role>();

    public DbSet<Property> Properties => Set<Property>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Roles");
            entity.Property(role => role.Name).IsRequired().HasMaxLength(100);
            entity.HasIndex(role => role.Name).IsUnique();
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");
            entity.Property(user => user.FirstName).IsRequired().HasMaxLength(100);
            entity.Property(user => user.LastName).IsRequired().HasMaxLength(100);
            entity.Property(user => user.Email).IsRequired().HasMaxLength(256);
            entity.Property(user => user.PasswordHash).IsRequired().HasMaxLength(200);
            entity.HasIndex(user => user.Email).IsUnique();

            entity.HasOne(user => user.Role)
                .WithMany(role => role.Users)
                .HasForeignKey(user => user.RoleId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Property>(entity =>
        {
            entity.ToTable("Properties");
            entity.Property(property => property.Title).IsRequired().HasMaxLength(200);
            entity.Property(property => property.Description).HasMaxLength(2000);
            entity.Property(property => property.Address).IsRequired().HasMaxLength(300);
            entity.Property(property => property.Price).HasColumnType("numeric(18,2)");

            entity.HasOne(property => property.Agent)
                .WithMany(user => user.Properties)
                .HasForeignKey(property => property.AgentId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
