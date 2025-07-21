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
                Name = "Havregryn",
                Calories = 369,
                Protein = 14.1,
                Carbohydrates = 57.2,
                Fat = 6.7,
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