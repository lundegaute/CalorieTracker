using CalorieTracker.Models;
using CalorieTracker.DTO;

namespace CalorieTracker.HelperMethods
{
    public static class ResponseBuilder
    {
        public static List<ResponseMealNameDTO> MealName(IEnumerable<MealName> mealNames)
        {
            var mealNameResponse = new List<ResponseMealNameDTO>();
            mealNameResponse.AddRange(mealNames.Select(mn => new ResponseMealNameDTO
            {
                Id = mn.Id,
                Name = mn.Name
            }));
            return mealNameResponse;
        }
    }
}