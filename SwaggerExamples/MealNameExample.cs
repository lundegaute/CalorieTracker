using CalorieTracker.DTO;
using Swashbuckle.AspNetCore.Filters;


namespace CalorieTracker.SwaggerExamples
{
    public class AddMealNameExample : IExamplesProvider<AddMealNameDTO>
    {
        public AddMealNameDTO GetExamples()
        {
            return new AddMealNameDTO
            {
                Name = "Havregrøt"
            };
        }
    }
    public class UpdateMealNameExample : IExamplesProvider<UpdateMealNameDTO>
    {
        public UpdateMealNameDTO GetExamples()
        {
            return new UpdateMealNameDTO
            {
                Id = 1,
                Name = "Havregrøt"
            };
        }
    }
}