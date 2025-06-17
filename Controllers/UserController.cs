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
                await _authService.RegisterUserAsync(user);
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

        [HttpPost("Login")]
        [SwaggerRequestExample(typeof(LoginUserDTO), typeof(LoginUserExample))]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserDTO user)
        {
            try
            {
                var token = await _authService.ValidateUser(user);
                int expireMinutes = _jwtSettings.ExpireMinutes;
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddMinutes(expireMinutes),
                };
                Response.Cookies.Append("token", token, cookieOptions);
                return Ok(token);
            }
            catch (ArgumentException e) // If Email does not match any in databse
            {
                return BadRequest(new { message = e.Message });
            }
            catch (UnauthorizedAccessException e) // If Credentials is wrong
            {
                return BadRequest(new { message = e.Message });
            }
            catch (HttpRequestException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Server error" });
            }
        }
    }
}