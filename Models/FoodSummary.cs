
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CalorieTracker.Models
{
    public class FoodSummary
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public double? Protein { get; set; }
        public double? Carbohydrates { get; set; }
        public double? Fat { get; set; }
    }
}