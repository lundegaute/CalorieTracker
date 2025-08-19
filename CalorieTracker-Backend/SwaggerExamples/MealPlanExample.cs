using CalorieTracker.DTO;
using Swashbuckle.AspNetCore.Filters;


namespace CalorieTracker.SwaggerExamples
{
    public class AddMealPlanExample : IExamplesProvider<AddMealPlanDTO>
    {
        public AddMealPlanDTO GetExamples()
        {
            return new AddMealPlanDTO
            {
                Name = "Vektnedgang"
            };
        }
    }
    public class UpdateMealPlanExample : IExamplesProvider<UpdateMealPlanDTO>
    {
        public UpdateMealPlanDTO GetExamples()
        {
            return new UpdateMealPlanDTO
            {
                Id = 1,
                Name = "Vektøkning"
            };
        }
    }
}