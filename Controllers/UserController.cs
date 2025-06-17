using Microsoft.AspNetCore.Mvc;
using CalorieTracker.Services;
using Microsoft.Extensions.Options;
using CalorieTracker.Configuration;
using CalorieTracker.DTO;
using Swashbuckle.AspNetCore.Filters;
using CalorieTracker.SwaggerExamples;

namespace CalorieTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly JwtSettings _jwtSettings;

        public UserController(AuthService authService, IOptions<JwtSettings> jwtSettings)
        {
            _authService = authService;
            _jwtSettings = jwtSettings.Value;
        }

        [HttpPost("Register")]
        [SwaggerRequestExample(typeof(RegisterUserDTO), typeof(RegisterUserExample))]
        public async Task<ActionResult> RegisterUser([FromBody] RegisterUserDTO user)
        {
            try
            {
                Console.WriteLine("-------------------- User Controller RegisterUser --------------------");
                await _authService.RegisterUserAsync(user);
                Console.WriteLine("-------------------- User Controller RegisterUser --------------------");
                return Ok(new { message = "User registered successfully." });
            }
            catch (ArgumentException e)
            {
                return BadRequest(new { message = e.Message });
            }
            catch (HttpRequestException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while registering the user." });
            }
        }
    }
}