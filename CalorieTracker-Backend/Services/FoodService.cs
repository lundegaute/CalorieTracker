using MongoDB.Driver;
using Microsoft.Extensions.Options;
using CalorieTracker.Data;
using CalorieTracker.Models;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.Services;
using CalorieTracker.HelperMethods;
using CalorieTracker.DTO;

namespace CalorieTracker.Services
{
    public class FoodService
    {
        private readonly IMongoCollection<FoodSummary> _foodsCollection;
        private readonly IMongoCollection<Food> _detailedFoodCollection;
        private readonly FoodSqlService _foodSqlService;

        public FoodService(IMongoClient mongoClient, IOptions<MongoDbSettingsClass> mongoDbSettings, FoodSqlService foodSqlService)
        {
            var database = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _foodsCollection = database.GetCollection<FoodSummary>("Food");
            _detailedFoodCollection = database.GetCollection<Food>("DetailedFoods");
            _foodSqlService = foodSqlService;

            // Ensure unique index on Name
            var indexKeys = Builders<FoodSummary>.IndexKeys.Ascending(f => f.Name);
            var indexOptions = new CreateIndexOptions { Unique = true };
            var indexModel = new CreateIndexModel<FoodSummary>(indexKeys, indexOptions);
            _foodsCollection.Indexes.CreateOne(indexModel);
        }


        // ------------------------------------------ Methods
        public async Task<IEnumerable<FoodSummary>> GetFoodsAsync()
        {
            var foods = await _foodsCollection.Find(_ => true).ToListAsync();
            return foods;
        }

        public async Task<IEnumerable<ResponseFoodDTO>> Search(string name)
        {
            var queryWords = name.Trim().Split(" ", StringSplitOptions.RemoveEmptyEntries);

            var filterBuilder = Builders<FoodSummary>.Filter;
            var filters = queryWords
                .Select(word => filterBuilder.Regex(
                    f => f.Name,
                    new MongoDB.Bson.BsonRegularExpression(word, "i") // "i" = case-insensitive
                ))
                .ToList();

            var combinedFilter = filterBuilder.And(filters); // Example of combined filter: f => f.Name.Regex(new BsonRegularExpression("word", "i"))

            var foods = await _foodsCollection
                .Find(combinedFilter)
                .ToListAsync();

            if (foods.Count == 0) // If no food is found in MongoDB, a search in the SQL database is done for that specific name
            {
                var foodFromSql = await _foodSqlService.GetFood(name);
                return [foodFromSql];
            }
            var foodSummarySql = foods.Select( (f, index) => new FoodSummarySql
            {
                Id = index + 1,
                Name = f.Name,
                Calories = f.Calories,
                Protein = f.Protein,
                Carbohydrates = f.Carbohydrates,
                Fat = f.Fat,
            });
            var response = ResponseBuilder.Foods(foodSummarySql);
            return response;
        }

        public async Task<string> LoadIntoDetailedFood(IEnumerable<Food> foods)
        {
            var isNotEmpty = await _detailedFoodCollection.Find(_ => true).AnyAsync();
            if (isNotEmpty)
            {
                return "Database Already Initialized";
            }
            foreach (var food in foods)
            {
                var filter = Builders<Food>.Filter.Eq(f => f.foodName, food.foodName);
                await _detailedFoodCollection.ReplaceOneAsync(filter, food, new ReplaceOptions { IsUpsert = true });
            }
            return "Database Initialized successfully";
        }

        public async Task<string> LoadMongoDbWithMatvaretabellen(IEnumerable<FoodSummary> foods)
        {
            var isNotEmpty = await _foodsCollection.Find(_ => true).AnyAsync();
            if (isNotEmpty)
            {
                return "Database Already initialized with data";
            }
            foreach (var food in foods)
            {
                var filter = Builders<FoodSummary>.Filter.Eq(f => f.Name, food.Name);
                await _foodsCollection.ReplaceOneAsync(filter, food, new ReplaceOptions { IsUpsert = true });
            }
            return "Database initialized successfully";
        }
    }
}