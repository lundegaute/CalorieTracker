using CalorieTracker.DTO;
namespace CalorieTracker.DTO
{
    public class MealSummaryDTO
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public decimal? TotalCalories { get; set; }
        public decimal? TotalProtein { get; set; }
        public decimal? TotalCarbohydrate { get; set; }
        public decimal? TotalFat { get; set; }
    }
}