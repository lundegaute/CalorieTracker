using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using CalorieTracker.Services;
using CalorieTracker.Models;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;

namespace CalorieTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FoodsController : ControllerBase
    {
        private readonly FoodService _foodService;

        public FoodsController(FoodService foodService)
        {
            _foodService = foodService;
        }

        /// <summary>
        /// Gets all foods from the MongoDB database. (Only simple form: Cals, Prot, Carbs and Fat)
        /// </summary>
        /// <response code="200">Returns a list of foods from mongoDB</response>
        /// <response code="500">If there is an error fetching data from the database</response>
        [HttpGet("/mongoDb/foods")]
        public async Task<ActionResult<IEnumerable<FoodSummary>>> GetFoodsFromDb() // Getting food from my MongoDB database
        {
            try
            {
                var foods = await _foodService.GetFoodsAsync();
                return Ok(foods);
            }
            catch (HttpRequestException)
            {
                return StatusCode(500, $"Error fetching data from database");
            }
        }

        /// <summary>
        /// Searches for a foods that matches the given name in the MongoDB database. (Only simple form: Cals, Prot, Carbs and Fat)
        /// </summary>
        /// <param name="name"></param>
        /// <response code="200">Returns a list of foods that match the name</response>
        /// <response code="500">If there is an error fetching data from the database</response>
        [HttpPost]
        public async Task<ActionResult<IEnumerable<FoodSummary>>> GetFoodFromMongoDb([FromBody] string name)
        {
            try
            {
                var food = await _foodService.Search(name);
                return Ok(food);
            }
            catch (HttpRequestException)
            {
                return StatusCode(500, "Error fetching food from MongoDb");
            }
        }

        /// <summary>
        /// This fetches all detailed data from matvaretabellen api and stores it in mongoDB if not already there
        /// </summary>
        /// <returns></returns>
        [HttpGet("AllFoodData")]
        public async Task<ActionResult<IEnumerable<Food>>> GetAllFoodData()
        {
            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync("https://www.matvaretabellen.no/api/nb/foods.json");
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error fetching data from database");
            }
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var foodWrapper = JsonConvert.DeserializeObject<FoodWrapper>(jsonResponse);
            var message = await _foodService.LoadIntoDetailedFood(foodWrapper.Foods);

            return Ok(message);
        }

        /// <summary>
        /// This fetches a simple version of matvaretabellens api data and stores it in mongoDB if not already there
        /// </summary>
        /// <response code="200">Returns a success message</response>
        /// <response code="500">If there is an error fetching data from the database</response>
        [HttpGet]
        public async Task<ActionResult> GetFoodsFromMatvareTabellen()
        {
            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync("https://www.matvaretabellen.no/api/nb/foods.json");
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error fetching data from database");
            }
            var content = await response.Content.ReadAsStringAsync();

            // Parsing content
            var json = JObject.Parse(content);
            var foodsArray = json["foods"] as JArray;

            var summaries = foodsArray.Select(food =>
                {
                    string name = food["foodName"]?.ToString() ?? "Unknown";
                    double calories = food["calories"]?["quantity"] != null && double.TryParse(food["calories"]["quantity"].ToString(), out double calVal)
                        ? calVal
                        : 0;

                    var constituents = food["constituents"] as JArray;

                    double? GetNutrient(string id)
                    {
                        if (constituents == null) return null;
                        var nutrient = constituents
                            .FirstOrDefault(c => c["nutrientId"]?.ToString() == id);

                        if (nutrient != null && nutrient["quantity"] != null && double.TryParse(nutrient["quantity"].ToString(), out double value))
                        {
                            return value;
                        }
                        return null;
                    }

                    return new FoodSummary
                    {
                        Name = name,
                        Calories = calories,
                        Protein = GetNutrient("Protein"),
                        Fat = GetNutrient("Fett"),
                        Carbohydrates = GetNutrient("Karbo")
                    };
                }).ToList();

            foreach (var summary in summaries)
            {
                Console.WriteLine(JsonConvert.SerializeObject(summary, Formatting.Indented));
            }
            var message = await _foodService.LoadMongoDbWithMatvaretabellen(summaries);
            return Ok(message);
        }
    }
}