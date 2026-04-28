using EstateFlow.Domain.Common;

namespace EstateFlow.Domain.Entities;

public class SavedProperty : BaseEntity
{
    public Guid UserId { get; set; }

    public User? User { get; set; }

    public Guid PropertyId { get; set; }

    public Property? Property { get; set; }
}
