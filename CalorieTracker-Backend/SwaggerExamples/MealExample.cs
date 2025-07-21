using CalorieTracker.DTO;
using Swashbuckle.AspNetCore.Filters;

namespace CalorieTracker.SwaggerExamples
{
    public class AddMealExample : IExamplesProvider<AddMealDTO>
    {
        public AddMealDTO GetExamples()
        {
            return new AddMealDTO
            {
                MealNameId = 1,
                FoodId = 1,
                Quantity = 100,
            };
        }
    }
    public class UpdateMealExample : IExamplesProvider<UpdateMealDTO>
    {
        public UpdateMealDTO GetExamples()
        {
            return new UpdateMealDTO
            {
                Id = 1,
                MealNameId = 1,
                FoodId = 1,
                Quantity = 150,
            };
        }
    }
}