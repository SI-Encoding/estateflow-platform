using EstateFlow.Application.Auth.Dtos;

namespace EstateFlow.Application.Auth.Interfaces;

public interface IAuthService
{
    Task<UserResponseDto> RegisterAsync(RegisterUserRequestDto request, CancellationToken cancellationToken = default);

    Task<AuthResponseDto> LoginAsync(LoginRequestDto request, CancellationToken cancellationToken = default);
}
