using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using EstateFlow.Application.Auth.Dtos;
using EstateFlow.Application.Common.Dtos;
using EstateFlow.Application.Properties.Dtos;
using Xunit;

namespace EstateFlow.API.Tests;

public class EngagementEndpointsTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly CustomWebApplicationFactory _factory;

    public EngagementEndpointsTests(CustomWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task SaveUnsaveMineAndInquiry_WorkEndToEnd()
    {
        using var agentClient = _factory.CreateClient();
        var agentToken = await RegisterAndLoginAsync(agentClient, "Agent");
        agentClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", agentToken);

        var createResponse = await agentClient.PostAsJsonAsync("/api/property", new CreatePropertyRequestDto
        {
            Price = 615000m,
            Address = "900 Harbour Street",
            Description = "Waterfront listing",
            Bedrooms = 2,
            Bathrooms = 2,
            PropertyType = "Condo"
        });

        createResponse.EnsureSuccessStatusCode();
        var property = await createResponse.Content.ReadFromJsonAsync<PropertyResponseDto>();
        Assert.NotNull(property);

        var mineResponse = await agentClient.GetFromJsonAsync<PagedResultDto<PropertyResponseDto>>("/api/property/mine?pageNumber=1&pageSize=10");
        Assert.NotNull(mineResponse);
        Assert.Contains(mineResponse.Items, item => item.Id == property.Id);

        using var buyerClient = _factory.CreateClient();
        var buyerToken = await RegisterAndLoginAsync(buyerClient, "Buyer");
        buyerClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", buyerToken);

        var saveResponse = await buyerClient.PostAsync($"/api/property/{property.Id}/save", null);
        Assert.Equal(HttpStatusCode.NoContent, saveResponse.StatusCode);

        var savedProperties = await buyerClient.GetFromJsonAsync<List<PropertyResponseDto>>("/api/property/saved");
        Assert.NotNull(savedProperties);
        Assert.Contains(savedProperties, item => item.Id == property.Id);

        var inquiryResponse = await buyerClient.PostAsJsonAsync($"/api/property/{property.Id}/inquiries", new InquiryRequestDto
        {
            Name = "Jamie Buyer",
            Email = "jamie@example.com",
            Message = "I would like to schedule a viewing."
        });

        inquiryResponse.EnsureSuccessStatusCode();

        var unsaveResponse = await buyerClient.DeleteAsync($"/api/property/{property.Id}/save");
        Assert.Equal(HttpStatusCode.NoContent, unsaveResponse.StatusCode);
    }

    private static async Task<string> RegisterAndLoginAsync(HttpClient client, string role)
    {
        var uniqueEmail = $"{Guid.NewGuid():N}@example.com";

        var registerResponse = await client.PostAsJsonAsync("/api/auth/register", new RegisterUserRequestDto
        {
            FirstName = "Morgan",
            LastName = role,
            Email = uniqueEmail,
            Password = "SecurePass123!",
            Role = role
        });

        registerResponse.EnsureSuccessStatusCode();

        var loginResponse = await client.PostAsJsonAsync("/api/auth/login", new LoginRequestDto
        {
            Email = uniqueEmail,
            Password = "SecurePass123!"
        });

        loginResponse.EnsureSuccessStatusCode();
        var authResponse = await loginResponse.Content.ReadFromJsonAsync<AuthResponseDto>();

        return authResponse!.Token;
    }
}
