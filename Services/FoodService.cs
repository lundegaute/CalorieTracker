using MongoDB.Driver;
using Microsoft.Extensions.Options;
using CalorieTracker.Data;
using CalorieTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace CalorieTracker.Services
{
    public class FoodService
    {
        private readonly IMongoCollection<FoodSummary> _foodsCollection;
        private readonly IMongoCollection<Food> _detailedFoodCollection;

        public FoodService(IMongoClient mongoClient, IOptions<MongoDbSettingsClass> mongoDbSettings)
        {
            var database = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _foodsCollection = database.GetCollection<FoodSummary>("Food");
            _detailedFoodCollection = database.GetCollection<Food>("DetailedFoods");

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

        public async Task<IEnumerable<FoodSummary>> Search(string name)
        {
            var filter = Builders<FoodSummary>
                .Filter
                .Regex(f => f.Name, new MongoDB.Bson.BsonRegularExpression(name.Trim(), "i")); // Case-insensitive search
            var foods = await _foodsCollection.Find(filter).ToListAsync();
            return foods;
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