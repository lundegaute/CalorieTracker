
namespace CalorieTracker.Models
{
    public class MealName
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Meal>? Meals { get; set; }
        public User User { get; set; }

    }
}