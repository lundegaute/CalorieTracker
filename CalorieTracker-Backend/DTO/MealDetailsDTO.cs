
namespace CalorieTracker.DTO
{
    public class MealDetailsDTO
    {
        public int MealId { get; set; }
        public double? Quantity { get; set; }
        public string? FoodName { get; set; }
        public double? Calories { get; set; }
        public double? Protein { get; set; }
        public double? Carbohydrates { get; set; }
        public double? Fat { get; set; }
    }
}