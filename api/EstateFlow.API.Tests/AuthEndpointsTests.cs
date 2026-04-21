using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using EstateFlow.Application.Auth.Dtos;
using Xunit;

namespace EstateFlow.API.Tests;

public class AuthEndpointsTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _httpClient;

    public AuthEndpointsTests(CustomWebApplicationFactory factory)
    {
        _httpClient = factory.CreateClient();
    }

    [Fact]
    public async Task RegisterLoginAndAccessProtectedEndpoint_WorkEndToEnd()
    {
        var registerResponse = await _httpClient.PostAsJsonAsync("/api/auth/register", new RegisterUserRequestDto
        {
            FirstName = "Ava",
            LastName = "Agent",
            Email = "ava@example.com",
            Password = "SecurePass123!",
            Role = "Agent"
        });

        registerResponse.EnsureSuccessStatusCode();
        var registeredUser = await registerResponse.Content.ReadFromJsonAsync<UserResponseDto>();

        Assert.NotNull(registeredUser);
        Assert.Equal("Agent", registeredUser.Role);

        var loginResponse = await _httpClient.PostAsJsonAsync("/api/auth/login", new LoginRequestDto
        {
            Email = "ava@example.com",
            Password = "SecurePass123!"
        });

        loginResponse.EnsureSuccessStatusCode();
        var authResponse = await loginResponse.Content.ReadFromJsonAsync<AuthResponseDto>();

        Assert.NotNull(authResponse);
        Assert.False(string.IsNullOrWhiteSpace(authResponse.Token));
        Assert.Equal("ava@example.com", authResponse.User.Email);
        Assert.Equal("Agent", authResponse.User.Role);

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", authResponse.Token);

        var protectedResponse = await _httpClient.GetAsync("/api/test");
        protectedResponse.EnsureSuccessStatusCode();
    }

    [Fact]
    public async Task ProtectedEndpoint_WithoutToken_ReturnsUnauthorized()
    {
        var response = await _httpClient.GetAsync("/api/test");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}
