using System.ComponentModel.DataAnnotations;
using CalorieTracker.Models;

namespace CalorieTracker.DTO
{
    public class AddFoodDTO
    {
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public double Calories { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public double? Protein { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public double? Carbohydrates { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public double? Fat { get; set; }
    }
    public class UpdateFoodDTO
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public double Calories { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public double? Protein { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public double? Carbohydrates { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public double? Fat { get; set; }
    }
    public class ResponseFoodDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public double? Protein { get; set; }
        public double? Carbohydrates { get; set; }
        public double? Fat { get; set; }
    }
}