
namespace CalorieTracker.Models
{
    public class UserMeals
    {
        public int Id { get; set; }
        public User User { get; set; }
        public MealName MealName { get; set; }
    }
}