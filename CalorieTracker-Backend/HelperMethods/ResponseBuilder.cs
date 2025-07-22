using CalorieTracker.Models;
using CalorieTracker.DTO;
using CalorieTracker.HelperMethods;

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
        public static List<ResponseMealDTO> Meals(IEnumerable<Meal> meals)
        {
            var mealResponse = new List<ResponseMealDTO>();
            mealResponse.AddRange(meals.Select(m => new ResponseMealDTO
            {
                Id = m.Id,
                Quantity = m.Quantity,
                MealName = new ResponseMealNameDTO
                {
                    Id = m.MealName.Id,
                    Name = m.MealName.Name
                },
                Food = new ResponseFoodDTO
                {
                    Id = m.Food.Id,
                    Name = m.Food.Name,
                    Calories = m.Food.Calories,
                    Protein = m.Food.Protein,
                    Carbohydrates = m.Food.Carbohydrates,
                    Fat = m.Food.Fat,
                },
            }));
            return mealResponse;
        }

        public static GenericResponse BuildGenericResponse(List<string> message, string type, string title, int status)
        {
            var genericResponse = new GenericResponse
            {
                message = new Dictionary<string, List<string>> {
                    {"Error", message }
                },
                type = type,
                title = title,
                status = status
            };
            return genericResponse;
        }
    }
}