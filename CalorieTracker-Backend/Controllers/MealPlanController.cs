using CalorieTracker.DTO;
using CalorieTracker.Models;
using CalorieTracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CalorieTracker.HelperMethods;
using System.Security.Claims;


namespace CalorieTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MealPlanController : ControllerBase
    {
        private readonly MealPlanService _mealPlanService;
        public MealPlanController(MealPlanService mealPlanService)
        {
            _mealPlanService = mealPlanService;
        }

        /// <summary>
        /// Get all mealplans from the database
        /// </summary>
        /// <response code="200">Returns a list of mealplans</response>
        /// <response code="500">Server error when fetching data from MealPlans</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseMealPlanDTO>>> GetAllMealPlans()
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var mealPlans = await _mealPlanService.GetAllMealPlans(int.Parse(userID));
                return Ok(mealPlans);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Backend server error on getting meal plans", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Get a single mealplan from the database
        /// </summary>
        /// <response code="200">Returns a sing mealplan</response>
        /// <response code="400">If Id not in range </response>
        /// <response code="500">Server error when fetching data from MealPlans</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseMealPlanDTO>> GetMealPlan(int id)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var mealPlan = await _mealPlanService.GetMealPlan(id, int.Parse(userID));
                return Ok(mealPlan);
            }
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Get mealplan", 400);
                return BadRequest(response);
            }
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Get mealplan", 400);
                return BadRequest(response);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Backend server error on getting mealplans", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Add mealplan to database
        /// </summary>
        /// <response code="200">Returns a created at action with responseMealPlanDTO</response>
        /// <response code="500">Server error when adding MealPlan to database</response>
        [HttpPost]
        public async Task<ActionResult<ResponseMealPlanDTO>> AddMealPlan([FromBody] AddMealPlanDTO addMealPlanDTO)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; 
                var newMealPlan = await _mealPlanService.AddMealPlan(addMealPlanDTO, int.Parse(userID));
                return CreatedAtAction(nameof(GetMealPlan), new { id = newMealPlan.Id }, newMealPlan);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Backend server error when adding new mealplan", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Update mealplan in database
        /// </summary>
        /// <response code="200">Returns a success message</response>
        /// <response code="400">If Id not in range </response>
        /// <response code="500">Server error when adding MealPlan to database</response>
        [HttpPut]
        public async Task<ActionResult> UpdateMealPlan([FromBody] UpdateMealPlanDTO updateMealPlanDTO)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                await _mealPlanService.UpdateMealPlan(updateMealPlanDTO, int.Parse(userID));
                return Ok(new { message = "Update successfull" });
            }
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Update Mealplan", 400);
                return BadRequest(response);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Backend server error when updating mealplan", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Delete mealplan in database
        /// </summary>
        /// <response code="200">Returns a success message</response>
        /// <response code="400">If Id not in range </response>
        /// <response code="500">Server error when adding MealPlan to database</response>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMealPlan(int id)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                await _mealPlanService.DeleteMealPlan(id, int.Parse(userID));
                return Ok(new { message = "Delete Successful" });
            }
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Delete Mealplan", 400);
                return BadRequest(response);
            }
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Delete Mealplan", 400);
                return BadRequest(response);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Delete Mealplan", 500);
                return BadRequest(response);
            }
        }
    }
}