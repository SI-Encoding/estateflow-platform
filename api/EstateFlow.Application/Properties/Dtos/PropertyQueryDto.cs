namespace EstateFlow.Application.Properties.Dtos;

public class PropertyQueryDto
{
    public decimal? MinPrice { get; set; }

    public decimal? MaxPrice { get; set; }

    public string? Address { get; set; }

    public string? PropertyType { get; set; }

    public int PageNumber { get; set; } = 1;

    public int PageSize { get; set; } = 10;

    public string? SortBy { get; set; } = "createdAt";

    public string? SortOrder { get; set; } = "desc";
}
