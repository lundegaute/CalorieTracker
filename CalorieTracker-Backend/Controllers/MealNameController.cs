using Microsoft.AspNetCore.Mvc;
using CalorieTracker.Services;
using CalorieTracker.Models;
using CalorieTracker.DTO;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using CalorieTracker.HelperMethods;

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
                var mealNames = await _mealNameService.GetMealNames(int.Parse(userID!));
                return Ok(mealNames);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Backend server error on getting meal names", 500);
                return BadRequest(response);
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
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Error during Meal delete", 400);
                return BadRequest(response);
            }
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Error during Meal delete", 400);
                return BadRequest(response);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(ArgumentOutOfRangeException).Name, "Backend server error on getting meal name", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Add a new MealName to the database for the logged in user
        /// </summary>
        /// <response code="201">Returns the newly created MealName</response>
        /// <response code="400">Id is 0 or negative</response>
        /// <response code="400">MealName already exists for the current user</response>
        /// <response code="400">UserID has no match in the database</response>
        /// <response code="500">Server error when adding MealName</response>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ResponseMealNameDTO>> AddMealName([FromBody] AddMealNameDTO mealNameDTO)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Find the user from token
                var newMealName = await _mealNameService.AddMealName(mealNameDTO, int.Parse(userID));
                return CreatedAtAction(nameof(GetMealName), new { id = newMealName.Id }, newMealName);
            }
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Error adding new meal name", 400);
                return BadRequest(response);
            } // If the id is 0 or negative
            catch (ArgumentException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentException).Name, "Error adding new meal name", 400);
                return BadRequest(response);
            } // If the mealName already exists
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Error adding new meal name", 400);
                return BadRequest(response);
            } // If UserID has no match in the database
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Backend server error when adding meal name", 500);
                return BadRequest(response);
            } // If the server fails to add the MealName
        }

        /// <summary>
        /// Update an existing MealName for the logged in user
        /// </summary>
        /// <response code="200">Returns a success message</response>
        /// <response code="400">Id is 0 or negative</response>
        /// <response code="400">MealName already exists for the current user</response>
        /// <response code="400">UserID has no match in the database</response>
        /// <response code="500">Server error when updating MealName</response>
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMealName(int id, [FromBody] UpdateMealNameDTO updateMealNameDTO)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                await _mealNameService.UpdateMealName(id, updateMealNameDTO, int.Parse(userID));

                return Ok("Meal Name updated successfully");
            }
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Error updating meal name", 400);
                return BadRequest(response);
            } // If the id is 0 or negative
            catch (ArgumentException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentException).Name, "Error updating meal name", 400);
                return BadRequest(response);
            } // If mealName already exists
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Error updating meal name", 400);
                return BadRequest(response);
            } // Is userID has no match in database
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Backend server error when updating", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Delete a MealName for the logged in user
        /// </summary>
        /// <response code="204">Returns no content</response>
        /// <response code="400">Id is 0 or negative</response>
        /// <response code="400">MealName not found with current ID</response>
        /// <response code="500">Server error when deleting MealName</response>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMealName(int id)
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Find the user from token
                await _mealNameService.DeleteMealName(id, int.Parse(userID!));
                return NoContent();
            }
            catch (ArgumentOutOfRangeException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentOutOfRangeException).Name, "Error during Meal delete", 400);
                return BadRequest(response);
            } // If the id is 0 or negative
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Error during Meal delete", 400);
                return BadRequest(response);
            } // If MealName not found with current ID
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Backend server error when deleting", 500);
                return BadRequest(response);
            }
        }
    }
}