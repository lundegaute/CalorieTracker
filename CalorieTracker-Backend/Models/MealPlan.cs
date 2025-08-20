
namespace CalorieTracker.Models
{
    public class MealPlan
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public User User { get; set; }
        public ICollection<MealName>? MealNames { get; set; }
    }
}