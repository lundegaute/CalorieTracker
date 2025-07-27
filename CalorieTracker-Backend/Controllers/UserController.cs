using Microsoft.AspNetCore.Mvc;
using CalorieTracker.Services;
using Microsoft.Extensions.Options;
using CalorieTracker.Configuration;
using CalorieTracker.DTO;
using Swashbuckle.AspNetCore.Filters;
using CalorieTracker.SwaggerExamples;
using CalorieTracker.HelperMethods;

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


        /// <summary>
        /// Register a new user to the Sql database
        /// </summary>
        /// <response code="200">User registered successfully</response>
        /// <response code="400">If the user already exists or if the input is invalid</response>
        /// <response code="500">If there is an error registering the user</response>
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

        /// <summary>
        /// Login a user and return a JWT token
        /// </summary>
        /// <response code="200">Returns a JWT token</response>
        /// <response code="400">If the email does not match any user or if the credentials are wrong</response>
        /// <response code="500">If there is an error logging in the user</response>
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
                    Secure = false, // Only false in development. Change to true if production
                    SameSite = SameSiteMode.Lax, // Changed from None to Lax for development
                    Expires = DateTime.UtcNow.AddMinutes(expireMinutes),
                    Path = "/" // Added explicit path
                };
                Response.Cookies.Append("token", token, cookieOptions);

                // Add detailed logging to verify cookie is being set
                Console.WriteLine($"Setting cookie 'token' for {expireMinutes} minutes");
                Console.WriteLine($"Cookie settings: HttpOnly={cookieOptions.HttpOnly}, Secure={cookieOptions.Secure}, SameSite={cookieOptions.SameSite}");
                Console.WriteLine($"Request origin: {Request.Headers["Origin"]}");
                Console.WriteLine($"Request host: {Request.Headers["Host"]}");

                return Ok(new { token, message = "Login successful", cookieSet = true });
            }
            catch (KeyNotFoundException e) // If Email does not match any in databse
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
        [HttpPost("Logout")]
        public async Task<ActionResult<string>> Logout()
        {
            Response.Cookies.Append("token", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // ✅ Set to true in production
                SameSite = SameSiteMode.Lax, // ✅ Lax is fine for dev; use None + Secure in prod
                Path = "/", // ✅ Must match the original path used during login
                Expires = DateTime.UtcNow.AddDays(-1) // ✅ Force expiration
            });
            var response = ResponseBuilder.BuildGenericResponse(["User logged out successfully."], "Authorization", "Logout", 200);
            return Ok(response);
        }
    }
}