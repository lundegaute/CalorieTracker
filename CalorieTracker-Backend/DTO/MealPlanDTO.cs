using CalorieTracker.Models;
using System.ComponentModel.DataAnnotations;

namespace CalorieTracker.DTO
{
    public class AddMealPlanDTO
    {
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string Name { get; set; }
    }
    public class UpdateMealPlanDTO
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string Name { get; set; }
    }
    public class ResponseMealPlanDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}