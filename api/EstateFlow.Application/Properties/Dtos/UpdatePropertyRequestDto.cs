namespace EstateFlow.Application.Properties.Dtos;

public class UpdatePropertyRequestDto
{
    public decimal Price { get; set; }

    public string Address { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int Bedrooms { get; set; }

    public int Bathrooms { get; set; }

    public string PropertyType { get; set; } = string.Empty;
}
