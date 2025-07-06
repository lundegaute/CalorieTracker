using Microsoft.AspNetCore.Mvc;
using CalorieTracker.Services;
using CalorieTracker.Models;
using CalorieTracker.DTO;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CalorieTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MealNameController : ControllerBase
    {
        private readonly MealNameService _mealNameService;

        public MealNameController(MealNameService mealNameService)
        {
            _mealNameService = mealNameService;
        }

        /// <summary>
        /// Get all mealnames from the database
        /// </summary>
        /// <response code="200">Returns a list of meal names</response>
        /// <response code="500">Server error when fetching data from MealNames</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseMealNameDTO>>> GetMealNames()
        {
            try
            {

                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var mealNames = await _mealNameService.GetMealNames(int.Parse(userID));
                return Ok(mealNames);
            }
            catch (HttpRequestException)
            {
                return StatusCode(500, "Server Error when fetching data from MealNames");
            }
        }
    }

}