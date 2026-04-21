namespace EstateFlow.Domain.Constants;

public static class SystemRoles
{
    public const string Buyer = "Buyer";
    public const string Agent = "Agent";
    public const string Admin = "Admin";

    public static readonly Guid BuyerId = Guid.Parse("7a1b594a-42c2-48d9-9726-bdcb5f024f01");
    public static readonly Guid AgentId = Guid.Parse("61b0c5a4-f444-49e7-830c-aa7ef0fc23a4");
    public static readonly Guid AdminId = Guid.Parse("74370fe4-3d95-45a8-b7df-f1df7288d20e");

    public static readonly IReadOnlyList<string> All = new[]
    {
        Buyer,
        Agent,
        Admin
    };

    public static bool IsSupported(string roleName)
    {
        return All.Any(role => string.Equals(role, roleName, StringComparison.OrdinalIgnoreCase));
    }

    public static string Normalize(string roleName)
    {
        return All.First(role => string.Equals(role, roleName, StringComparison.OrdinalIgnoreCase));
    }

    public static Guid GetId(string roleName)
    {
        var normalizedRole = Normalize(roleName);

        return normalizedRole switch
        {
            Buyer => BuyerId,
            Agent => AgentId,
            Admin => AdminId,
            _ => throw new InvalidOperationException($"Unsupported role '{roleName}'.")
        };
    }
}
