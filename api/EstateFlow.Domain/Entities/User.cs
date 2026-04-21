using EstateFlow.Domain.Common;

namespace EstateFlow.Domain.Entities;

public class User : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public Guid RoleId { get; set; }

    public Role? Role { get; set; }

    public ICollection<Property> Properties { get; set; } = new List<Property>();
}
