
using System.ComponentModel.DataAnnotations;
using CalorieTracker.Models;

namespace CalorieTracker.DTO
{
    public class AddMealDTO
    {
        [Required]
        [Range(0, int.MaxValue)]
        public double Quantity { get; set; }
        [Required]
        public int MealNameId { get; set; }
        [Required]
        public int FoodId { get; set; }
    }
    public class UpdateMealDTO
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public double Quantity { get; set; }
        [Required]
        public int MealNameId { get; set; }
        [Required]
        public int FoodId { get; set; }
    }
    public class ResponseMealDTO
    {
        public int Id { get; set; }
        public double Quantity { get; set; }
        public ResponseMealNameDTO MealName { get; set; }
        public ResponseFoodDTO Food { get; set; }
    }

}