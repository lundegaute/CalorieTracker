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
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Find the user from token
                var mealNames = await _mealNameService.GetMealNames(int.Parse(userID));
                return Ok(mealNames);
            }
            catch (HttpRequestException)
            {
                return StatusCode(500, "Server Error when fetching data from MealNames");
            }
        }

        /// <summary>
        /// Return a single MealName for the logged in user
        /// </summary>
        /// <response code="200">Returns a single MealName</response>
        /// <response code="400">Id is 0 or negative</response>
        /// <response code="400">MealName not found with current ID</response>
        /// <response code="500">Server error when fetching data from MealNames</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseMealNameDTO>> GetMealName(int id)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Find the user from token
                var mealName = await _mealNameService.GetMealName(id, int.Parse(userID));
                return Ok(mealName);
            }
            catch (ArgumentOutOfRangeException e) { return BadRequest(new { message = e.Message }); }
            catch (KeyNotFoundException e) { return BadRequest(new { message = e.Message }); }
            catch (HttpRequestException) { return StatusCode(500, "Server Error"); }
        }

        [HttpPost]
        public async Task<ActionResult<ResponseMealNameDTO>> AddMealName(AddMealNameDTO mealNameDTO)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Find the user from token
                var newMealName = await _mealNameService.AddMealName(mealNameDTO, int.Parse(userID));
                return CreatedAtAction(nameof(GetMealName), new { id = newMealName.Id }, newMealName);
            }
            catch (ArgumentOutOfRangeException e) { return BadRequest(new { message = e.Message }); } // If the id is 0 or negative
            catch (ArgumentException e) { return BadRequest(new { message = e.Message }); } // If the mealName already exists
            catch (KeyNotFoundException e) { return BadRequest(new { message = e.Message }); } // If UserID has no match in the database
            catch (HttpRequestException) { return StatusCode(500, "Server Error when adding MealName"); } // If the server fails to add the MealName
        }

    }
}