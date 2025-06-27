
namespace CalorieTracker.Models
{
    public class FoodSummary
    {
        public string? Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public double? Protein { get; set; }
        public double? Carbohydrates { get; set; }
        public double? Fat { get; set; }
        public ICollection<Meal>? Meals { get; set; }
    }
}