using System.Security.Claims;
using CalorieTracker.DTO;
using CalorieTracker.Services;
using CalorieTracker.HelperMethods;
using Microsoft.AspNetCore.Mvc;

namespace CalorieTracker.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class MealController : ControllerBase
    {
        private readonly MealService _mealService;
        public MealController(MealService mealService)
        {
            _mealService = mealService;
        }

        /// <summary>
        /// Get all the meals belonging to logged in user
        /// </summary>
        /// <response code="200">Returns a list of meals for logged in user</response>
        /// <response code="400">If the user ID is not found or invalid</response>
        /// <response code="500">If there is a server error while fetching meals</response
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseMealDTO>>> GetMealsForUser()
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var meals = await _mealService.GetMealsForUser(int.Parse(userID!));
                return Ok(meals);
            }
            catch (ArgumentOutOfRangeException e) { return BadRequest(new { message = e.Message }); }
            catch (HttpRequestException) { return StatusCode(500, new { message = "Server Error fetching meals for user" }); }
        }

        /// <summary>
        /// Get a single meal for logged in user
        /// </summary>
        /// <response code="400">Id or userID 0 or negative</response>
        /// <response code="404">If the meal with the given ID does not exist for the user</response>
        /// <response code="500">If there is a server error while fetching the meal</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseMealDTO>> GetMealForUser(int id)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var meal = await _mealService.GetMealForUser(id, int.Parse(userID));
                return Ok(meal);
            }
            catch (ArgumentOutOfRangeException e) { return BadRequest(new { message = e.Message }); }
            catch (ArgumentException e) { return BadRequest(new { message = e.Message }); }
            catch (KeyNotFoundException e) { return BadRequest(new { message = e.Message }); }
            catch (HttpRequestException) { return StatusCode(500, new { message = "Server error fetching meal for user" }); }
        }

        /// <summary>
        /// Add a new meal for the logged in user
        /// </summary>
        /// <response code="201">Returns the created meal</response>
        /// <response code="400">If the meal data is invalid or user ID is not found</response>
        /// <response code="500">If there is a server error while adding the meal</response>
        [HttpPost]
        public async Task<ActionResult<ResponseMealDTO>> AddMealForUser([FromBody] AddMealDTO addMealDTO)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var createdMeal = await _mealService.AddMealToUser( int.Parse(userID!), addMealDTO);
                return CreatedAtAction(nameof(GetMealForUser), new { id = createdMeal.Id }, createdMeal);
            }
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Error during Meal update", 400);
                return BadRequest(response);
            }
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Error during Meal update", 400);
                return BadRequest(response);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server Error"], typeof(HttpRequestException).Name, "Error during Meal update", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Update an existing meal for the logged in user
        /// </summary>
        /// <response code="200">Returns a success message</response>
        /// <response code="400">If the meal ID is invalid or user ID is not found</response>
        /// <response code="404">If the meal with the given ID does not exist for the user</response>
        /// <response code="500">If there is a server error while updating the meal</
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMealForUser(int id, [FromBody] UpdateMealDTO updateMealDTO)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                await _mealService.UpdateMealForUser(id, int.Parse(userID), updateMealDTO);
                return Ok(new { message = "Meal updated successfully" });
            }
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Error during Meal update", 400);
                return BadRequest(response);
            }
            catch (ArgumentException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentException).Name, "Error during Meal update", 400);
                return BadRequest(response);
            }
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Error during Meal update", 404);
                return BadRequest(response);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server Error"], typeof(HttpRequestException).Name, "Error during Meal update", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Delete a food item from the specified meal for the logged in user
        /// </summary>
        /// <response code="200">Returns a success message</response>
        /// <response code="400">If the meal ID or user ID is invalid</response>
        /// <response code="404">If the meal with the given ID does not exist for the user</response>
        /// <response code="500">If there is a server error while deleting the meal</response>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMealForUser(int id)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                await _mealService.DeleteFoodForUser(id, int.Parse(userID));
                return Ok("Meal deleted successfully");
            }
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Error during Meal delete", 400);
                return BadRequest(response);
            }
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Error during Meal delete", 404);
                return BadRequest(response);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server Error"], typeof(HttpRequestException).Name, "Error during Meal delete", 500);
                return BadRequest(response);
            }
        }

    }
}