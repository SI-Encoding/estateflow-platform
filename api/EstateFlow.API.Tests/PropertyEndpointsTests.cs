using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using EstateFlow.Application.Auth.Dtos;
using EstateFlow.Application.Common.Dtos;
using EstateFlow.Application.Properties.Dtos;
using Xunit;

namespace EstateFlow.API.Tests;

public class PropertyEndpointsTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly CustomWebApplicationFactory _factory;

    public PropertyEndpointsTests(CustomWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task PropertyCrudAndFiltering_WorkEndToEnd()
    {
        using var agentClient = _factory.CreateClient();
        var agentToken = await RegisterAndLoginAsync(agentClient, "Agent");
        agentClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", agentToken);

        var createdPropertyIds = new List<Guid>();
        var propertyPayloads = new[]
        {
            new CreatePropertyRequestDto
            {
                Price = 450000m,
                Address = "123 Main Street",
                Description = "Two-storey townhouse",
                Bedrooms = 3,
                Bathrooms = 2,
                PropertyType = "Townhouse"
            },
            new CreatePropertyRequestDto
            {
                Price = 725000m,
                Address = "456 Oak Avenue",
                Description = "Spacious detached home",
                Bedrooms = 4,
                Bathrooms = 3,
                PropertyType = "House"
            },
            new CreatePropertyRequestDto
            {
                Price = 510000m,
                Address = "789 Main Boulevard",
                Description = "Modern condo downtown",
                Bedrooms = 2,
                Bathrooms = 2,
                PropertyType = "Condo"
            }
        };

        foreach (var payload in propertyPayloads)
        {
            var createResponse = await agentClient.PostAsJsonAsync("/api/property", payload);
            createResponse.EnsureSuccessStatusCode();

            var createdProperty = await createResponse.Content.ReadFromJsonAsync<PropertyResponseDto>();
            Assert.NotNull(createdProperty);
            createdPropertyIds.Add(createdProperty.Id);
        }

        using var anonymousClient = _factory.CreateClient();
        var pagedResponse = await anonymousClient.GetFromJsonAsync<PagedResultDto<PropertyResponseDto>>(
            "/api/property?address=main&minPrice=400000&maxPrice=550000&sortBy=price&sortOrder=asc&pageNumber=1&pageSize=2");

        Assert.NotNull(pagedResponse);
        Assert.Equal(2, pagedResponse.TotalCount);
        Assert.Equal(1, pagedResponse.PageNumber);
        Assert.Equal(2, pagedResponse.PageSize);
        Assert.Equal(1, pagedResponse.TotalPages);
        Assert.Equal(2, pagedResponse.Items.Count);
        Assert.Equal(new[] { 450000m, 510000m }, pagedResponse.Items.Select(property => property.Price).ToArray());

        var updateResponse = await agentClient.PutAsJsonAsync($"/api/property/{createdPropertyIds[0]}", new UpdatePropertyRequestDto
        {
            Price = 460000m,
            Address = "123 Main Street",
            Description = "Updated townhouse listing",
            Bedrooms = 3,
            Bathrooms = 2,
            PropertyType = "Townhouse"
        });

        updateResponse.EnsureSuccessStatusCode();
        var updatedProperty = await updateResponse.Content.ReadFromJsonAsync<PropertyResponseDto>();
        Assert.NotNull(updatedProperty);
        Assert.Equal(460000m, updatedProperty.Price);

        var deleteResponse = await agentClient.DeleteAsync($"/api/property/{createdPropertyIds[1]}");
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);
    }

    [Fact]
    public async Task CreateProperty_WithoutAuthentication_ReturnsUnauthorized()
    {
        using var client = _factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/property", new CreatePropertyRequestDto
        {
            Price = 400000m,
            Address = "321 Cedar Road",
            Description = "Unauthorized request",
            Bedrooms = 2,
            Bathrooms = 1,
            PropertyType = "Condo"
        });

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    private static async Task<string> RegisterAndLoginAsync(HttpClient client, string role)
    {
        var uniqueEmail = $"{Guid.NewGuid():N}@example.com";

        var registerResponse = await client.PostAsJsonAsync("/api/auth/register", new RegisterUserRequestDto
        {
            FirstName = "Taylor",
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
