using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace CalorieTracker.Models
{
    public class FoodSummary // For MongoDB
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public double? Protein { get; set; }
        public double? Carbohydrates { get; set; }
        public double? Fat { get; set; }
        public ICollection<Meal>? Meals { get; set; }
    }
    public class FoodSummarySql // For MySQL
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public double? Protein { get; set; }
        public double? Carbohydrates { get; set; }
        public double? Fat { get; set; }
        public ICollection<Meal>? Meals { get; set; }
    }
}