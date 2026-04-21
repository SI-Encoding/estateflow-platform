using EstateFlow.Application.Auth.Dtos;
using EstateFlow.Domain.Entities;

namespace EstateFlow.Application.Auth.Interfaces;

public interface IJwtTokenService
{
    AuthResponseDto CreateToken(User user);
}
