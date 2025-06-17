// Food myDeserializedClass = JsonConvert.DeserializeObject<Food>(myJsonResponse);
namespace CalorieTracker.Models
{
    public class Calories
    {
        public string sourceId { get; set; }
        public int? quantity { get; set; }
        public string unit { get; set; }
    }

    public class Constituent
    {
        public string sourceId { get; set; }
        public string nutrientId { get; set; }
        public double? quantity { get; set; }
        public string unit { get; set; }
    }

    public class Energy
    {
        public string sourceId { get; set; }
        public double quantity { get; set; }
        public string unit { get; set; }
    }

    public class Food
    {
        public List<string> searchKeywords { get; set; }
        public Calories calories { get; set; }
        public Energy energy { get; set; }
        public string foodName { get; set; }
        public List<Constituent> constituents { get; set; }
        public string uri { get; set; }
        public string foodGroupId { get; set; }
        public string foodId { get; set; }
    }

    public class FoodWrapper
    {
        public List<Food> Foods { get; set; }
    }
}

