
namespace CalorieTracker.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public double Quantity { get; set; }
        public MealName MealName { get; set; }
        public int FoodId { get; set; }
        public FoodSummarySql Food { get; set; }

    }
}