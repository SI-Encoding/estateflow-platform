using EstateFlow.Domain.Common;

namespace EstateFlow.Domain.Entities;

public class Inquiry : BaseEntity
{
    public Guid PropertyId { get; set; }

    public Property? Property { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;
}
