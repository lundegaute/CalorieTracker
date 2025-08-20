using CalorieTracker.DTO;
using Swashbuckle.AspNetCore.Filters;


namespace CalorieTracker.SwaggerExamples
{
    public class AddFoodExample : IExamplesProvider<AddFoodDTO>
    {
        public AddFoodDTO GetExamples()
        {
            return new AddFoodDTO
            {
                Name = "Protein Pulver",
                Calories = 380,
                Protein = 73.4,
                Carbohydrates = 5.4,
                Fat = 6.0,
            };
        }
    }
    public class UpdateFoodExample : IExamplesProvider<UpdateFoodDTO>
    {
        public UpdateFoodDTO GetExamples()
        {
            return new UpdateFoodDTO
            {
                Name = "Helmelk",
                Calories = 63,
                Protein = 3.4,
                Carbohydrates = 4.5,
                Fat = 3.5,
            };
        }
    }
}