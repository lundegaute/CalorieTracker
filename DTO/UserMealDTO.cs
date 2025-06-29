using CalorieTracker.Models;
using System.ComponentModel.DataAnnotations;

namespace CalorieTracker.DTO
{
    public class AddUserMealDTO
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int UserId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int MealNameId { get; set; }
    }
    public class UpdateUserMealDTO
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int UserId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int MealNameId { get; set; }
    }
    public class ResponseUserMealDTO
    {
        public int Id { get; set; }
        public User User { get; set; }
        public MealName MealName { get; set; }
    }
}