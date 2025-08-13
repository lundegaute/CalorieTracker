using CalorieTracker.DTO;
using CalorieTracker.HelperMethods;
using CalorieTracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CalorieTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FoodSqlController : ControllerBase
    {
        private readonly FoodSqlService _foodSqlService;

        public FoodSqlController(FoodSqlService foodSqlService)
        {
            _foodSqlService = foodSqlService;
        }

        /// <summary>
        /// Retrieves a list of all foods.
        /// </summary>
        /// <response code="200">Returns a list of all foods.</response>
        /// <response code="500">If there is an internal server error.</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResponseFoodDTO>>> GetFoods()
        {
            try
            {
                var foods = await _foodSqlService.GetFoods();
                return Ok(foods);
            }
            catch (HttpRequestException) { return StatusCode(500, "Server Error while fetching foods"); }
        }


        /// <summary>
        /// Getting one food from the DB based on Name
        /// </summary>
        /// <response code="200">Returns a food based on ID</response>
        /// <response code="400">If the food with the specified name is not found.</response>
        /// <response code="500">If there is an internal server error.</response>
        [HttpGet("{name}")]
        public async Task<ActionResult<ResponseFoodDTO>> GetFood(string name)
        {
            try
            {
                Console.WriteLine("------------------------------");
                Console.WriteLine(name);
                var food = await _foodSqlService.GetFood(name);
                return Ok(food);
            }
            catch (KeyNotFoundException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(KeyNotFoundException).Name, "Error fetching food from database", 400);
                return BadRequest(response);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Error fetching food from database", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Add new food to the MySql DB
        /// </summary>
        /// <response code="201">Returns the newly created food.</response>
        /// <response code="400">If the food already exists or if the input is invalid.</response>
        /// <response code="500">If there is an internal server error.</response>
        [HttpPost]
        public async Task<ActionResult<ResponseFoodDTO>> AddFood([FromBody] AddFoodDTO addFoodDTO)
        {
            try
            {
                var addedFood = await _foodSqlService.AddFood(addFoodDTO);
                return CreatedAtAction(nameof(GetFood), new { name = addedFood.Name }, addedFood);
            }
            catch (ArgumentException e)
            {
                var response = ResponseBuilder.BuildGenericResponse([e.Message], typeof(ArgumentException).Name, "Error adding food to database", 400);
                return BadRequest(response);
            }
            catch (HttpRequestException)
            {
                var response = ResponseBuilder.BuildGenericResponse(["Server error"], typeof(HttpRequestException).Name, "Error adding food to database", 500);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Update an existing food in the MySql DB.
        /// </summary>
        /// <response code="200">Returns a success message.</response>
        /// <response code="400">If the ID is less than or equal to zero, or if the food with the specified ID does not exist.</response>
        /// <response code="404">If the name is already in the database</response>
        /// <response code="500">If there is an internal server error.</response>
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFood(int id, [FromBody] UpdateFoodDTO updateFoodDTO)
        {
            try
            {
                var updatedFood = await _foodSqlService.UpdateFood(id, updateFoodDTO);
                return Ok(new { message = "Food updated successfully" });
            }
            catch (ArgumentOutOfRangeException e) { return BadRequest(new { message = e.Message }); }
            catch (ArgumentException e) { return BadRequest(new { message = e.Message }); }
            catch (KeyNotFoundException e) { return NotFound(new { message = e.Message }); }
            catch (HttpRequestException) { return StatusCode(500, "Server error adding new Food to DB"); }
        }

        /// <summary>
        /// Delete a food item from the MySql database
        /// </summary>
        /// <response code="200">Returns a success message.</response>
        /// <response code="404">If the food with the specified ID is not found.</response>
        /// <response code="500">If there is an internal server error.</response>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFood(int id)
        {
            try
            {
                await _foodSqlService.DeleteFood(id);
                return Ok(new { message = "Food deleted successfully" });
            }
            catch (ArgumentOutOfRangeException e) { return BadRequest(new { message = e.Message }); }
            catch (KeyNotFoundException e) { return BadRequest(new { message = e.Message }); }
            catch (HttpRequestException) { return StatusCode(500, "Server Error deleting food from MySql DB"); }
        }
    }
}