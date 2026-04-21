using EstateFlow.Application.Auth.Dtos;
using EstateFlow.Application.Auth.Interfaces;
using EstateFlow.Domain.Constants;
using EstateFlow.Domain.Entities;
using EstateFlow.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EstateFlow.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthService(ApplicationDbContext dbContext, IJwtTokenService jwtTokenService)
    {
        _dbContext = dbContext;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<UserResponseDto> RegisterAsync(
        RegisterUserRequestDto request,
        CancellationToken cancellationToken = default)
    {
        ValidateRegistrationRequest(request);

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var requestedRole = string.IsNullOrWhiteSpace(request.Role) ? SystemRoles.Buyer : request.Role.Trim();

        if (!SystemRoles.IsSupported(requestedRole))
        {
            throw new InvalidOperationException("The specified role is invalid.");
        }

        var existingUser = await _dbContext.Users
            .AnyAsync(user => user.Email == normalizedEmail, cancellationToken);

        if (existingUser)
        {
            throw new InvalidOperationException("A user with this email already exists.");
        }

        var normalizedRole = SystemRoles.Normalize(requestedRole);

        var user = new User
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Email = normalizedEmail,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            RoleId = SystemRoles.GetId(normalizedRole)
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new UserResponseDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = normalizedRole
        };
    }

    public async Task<AuthResponseDto> LoginAsync(
        LoginRequestDto request,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            throw new UnauthorizedAccessException("Email and password are required.");
        }

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var user = await _dbContext.Users
            .Include(candidate => candidate.Role)
            .SingleOrDefaultAsync(candidate => candidate.Email == normalizedEmail, cancellationToken);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        return _jwtTokenService.CreateToken(user);
    }

    private static void ValidateRegistrationRequest(RegisterUserRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.FirstName) ||
            string.IsNullOrWhiteSpace(request.LastName) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            throw new InvalidOperationException("First name, last name, email, and password are required.");
        }

        if (request.Password.Length < 8)
        {
            throw new InvalidOperationException("Password must be at least 8 characters long.");
        }
    }
}
