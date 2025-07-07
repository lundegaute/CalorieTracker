
using CalorieTracker.DTO;
using Swashbuckle.AspNetCore.Filters;

namespace CalorieTracker.SwaggerExamples
{
    public class RegisterUserExample : IExamplesProvider<RegisterUserDTO>
    {
        public RegisterUserDTO GetExamples()
        {
            return new RegisterUserDTO
            {
                Email = "Batman@gotham.com",
                Password = "Justice",
            };
        }
    }

    public class LoginUserExample : IExamplesProvider<LoginUserDTO>
    {
        public LoginUserDTO GetExamples()
        {
            return new LoginUserDTO
            {
                Email = "Batman@gotham.com",
                Password = "Justice",
            };
        }
    }
}