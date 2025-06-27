
namespace CalorieTracker.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public double Quantity { get; set; }
        public MealName MealName { get; set; }
        public FoodSummary Food { get; set; }

    }
}