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
        public static List<ResponseFoodDTO> Foods(IEnumerable<FoodSummarySql> foods)
        {
            var foodResponse = new List<ResponseFoodDTO>(foods.Count()); // Specifying list count to reducing the number of array resizes
            foodResponse.AddRange(foods.Select(f => new ResponseFoodDTO
            {
                Id = f.Id,
                Name = f.Name,
                Calories = f.Calories,
                Protein = f.Protein,
                Carbohydrates = f.Carbohydrates,
                Fat = f.Fat
            }));
            return foodResponse;
        }
    }
}