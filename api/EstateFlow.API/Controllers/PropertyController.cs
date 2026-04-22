using System.Security.Claims;
using EstateFlow.Application.Common.Dtos;
using EstateFlow.Application.Interfaces;
using EstateFlow.Application.Properties.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EstateFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertyController : ControllerBase
{
    private readonly IPropertyService _propertyService;

    public PropertyController(IPropertyService propertyService)
    {
        _propertyService = propertyService;
    }

    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(typeof(PagedResultDto<PropertyResponseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] PropertyQueryDto query, CancellationToken cancellationToken)
    {
        var response = await _propertyService.GetPagedAsync(query, cancellationToken);
        return Ok(response);
    }

    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(PropertyResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var response = await _propertyService.GetByIdAsync(id, cancellationToken);
        return response is null ? NotFound() : Ok(response);
    }

    [Authorize(Roles = "Agent,Admin")]
    [HttpPost]
    [ProducesResponseType(typeof(PropertyResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Create(CreatePropertyRequestDto request, CancellationToken cancellationToken)
    {
        try
        {
            var response = await _propertyService.CreateAsync(
                request,
                GetCurrentUserId(),
                GetCurrentUserRole(),
                cancellationToken);

            return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [Authorize(Roles = "Agent,Admin")]
    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(PropertyResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, UpdatePropertyRequestDto request, CancellationToken cancellationToken)
    {
        try
        {
            var response = await _propertyService.UpdateAsync(
                id,
                request,
                GetCurrentUserId(),
                GetCurrentUserRole(),
                cancellationToken);

            return response is null ? NotFound() : Ok(response);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [Authorize(Roles = "Agent,Admin")]
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var deleted = await _propertyService.DeleteAsync(
                id,
                GetCurrentUserId(),
                GetCurrentUserRole(),
                cancellationToken);

            return deleted ? NoContent() : NotFound();
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    private Guid GetCurrentUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        return Guid.TryParse(userId, out var parsedUserId)
            ? parsedUserId
            : throw new UnauthorizedAccessException("The current user identifier is invalid.");
    }

    private string GetCurrentUserRole()
    {
        return User.FindFirstValue(ClaimTypes.Role)
            ?? throw new UnauthorizedAccessException("The current user role is missing.");
    }
}
