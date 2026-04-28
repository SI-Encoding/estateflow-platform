using EstateFlow.Domain.Common;

namespace EstateFlow.Domain.Entities;

public class Property : BaseEntity
{
    public decimal Price { get; set; }

    public string Address { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int Bedrooms { get; set; }

    public int Bathrooms { get; set; }

    public string PropertyType { get; set; } = string.Empty;

    public Guid AgentId { get; set; }

    public User? Agent { get; set; }

    public ICollection<SavedProperty> SavedByUsers { get; set; } = new List<SavedProperty>();

    public ICollection<Inquiry> Inquiries { get; set; } = new List<Inquiry>();
}
