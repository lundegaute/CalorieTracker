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
                    Calories = m.Food.Calories * (m.Quantity / 100),
                    Protein = m.Food.Protein * (m.Quantity / 100),
                    Carbohydrates = m.Food.Carbohydrates * (m.Quantity / 100),
                    Fat = m.Food.Fat * (m.Quantity / 100),
                },
            }));
            return mealResponse;
        }
        public static List<MealDetailsDTO> MealDetails(IEnumerable<Meal> meals)
        {
            List<MealDetailsDTO> mealDetailsDTO = new List<MealDetailsDTO>();
            mealDetailsDTO.AddRange(meals.Select(m => new MealDetailsDTO
            {
                MealId = m.Id,
                Quantity = m.Quantity,
                FoodName = m.Food.Name,
                Calories = m.Food.Calories * (m.Quantity / 100d),
                Protein = m.Food.Protein * (m.Quantity / 100d),
                Carbohydrates = m.Food.Carbohydrates * (m.Quantity / 100d),
                Fat = m.Food.Fat * (m.Quantity / 100d),
            }));
            return mealDetailsDTO;
        }
        public static List<MealSummaryDTO> MealSummary(IEnumerable<MealName> mealNames, IEnumerable<Meal> meals)
        {
            List<MealSummaryDTO> mealSummaryDTO = new List<MealSummaryDTO>();
            mealSummaryDTO.AddRange(mealNames.Select(mn =>
            {
                var mealsForThisName = meals.Where(m => m.MealName.Id == mn.Id).ToList();
                return new MealSummaryDTO
                {
                    Id = mn.Id,
                    Name = mn.Name,
                    TotalCalories = mealsForThisName.Any()
                        ? Math.Round((decimal)mealsForThisName.Sum(m => m.Food.Calories * (m.Quantity / 100)), 2)
                        : null,
                    TotalProtein = mealsForThisName.Any()
                        ? Math.Round((decimal)mealsForThisName.Sum(m => m.Food.Protein * (m.Quantity / 100))!, 2)
                        : null,
                    TotalCarbohydrate = mealsForThisName.Any()
                        ? Math.Round((decimal)mealsForThisName.Sum(m => m.Food.Carbohydrates * (m.Quantity / 100))!, 2)
                        : null,
                    TotalFat = mealsForThisName.Any()
                        ? Math.Round((decimal)mealsForThisName.Sum(m => m.Food.Fat * (m.Quantity / 100))!, 2)
                        : null
                };
            }));
            return mealSummaryDTO;
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