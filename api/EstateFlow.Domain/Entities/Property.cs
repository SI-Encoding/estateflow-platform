using EstateFlow.Domain.Common;

namespace EstateFlow.Domain.Entities;

public class Property : BaseEntity
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public Guid AgentId { get; set; }

    public User? Agent { get; set; }
}
