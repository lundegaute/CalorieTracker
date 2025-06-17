
namespace CalorieTracker.Models
{

    public class EnergyValue
    {
        public int Calories { get; set; }
        public string Unit { get; set; }

    }

    public class Constituentsss
    {
        public string NutrientId { get; set; }
        public double? Quantity { get; set; }
        public string Unit { get; set; }
    }
    
}