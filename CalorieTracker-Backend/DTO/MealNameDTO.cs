using CalorieTracker.Models;
using System.ComponentModel.DataAnnotations;

namespace CalorieTracker.DTO
{
    public class AddMealNameDTO
    {
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int mealPlanId { get; set; }
    }
    public class UpdateMealNameDTO
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string Name { get; set; }
    }
    public class ResponseMealNameDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MealPlanId { get; set; }
    }
}