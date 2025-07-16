using CalorieTracker.Data;
using CalorieTracker.HelperMethods;
using CalorieTracker.DTO;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.Models;


namespace CalorieTracker.Services
{
    public class MealService
    {
        private readonly DataContext _context;

        public MealService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ResponseMealDTO>> GetMealsForUser(int userID)
        {
            Validation.CheckIfIdInRange(userID);
            var meals = await _context.Meals
                .Include(m => m.MealName)
                .Include(m => m.Food)
                .Where(m => m.MealName.User.Id == userID)
                .ToListAsync();
            var response = ResponseBuilder.Meals(meals);
            return response;
        }
        public async Task<ResponseMealDTO> GetMealForUser(int id, int userID)
        {
            Validation.CheckIfIdInRange(id);
            Validation.CheckIfIdInRange(userID);

            var meal = await _context.Meals
                .Include(m => m.MealName)
                .Include(m => m.Food)
                .Where(m => m.MealName.User.Id == userID)
                .FirstOrDefaultAsync();
            Validation.CheckIfNull(meal);

            var response = ResponseBuilder.Meals([meal!]).FirstOrDefault();
            return response!;
        }
        public async Task<ResponseMealDTO> AddMealToUser(int userID, AddMealDTO addMealDTO)
        {
            Validation.CheckIfIdInRange(userID);

            var foodAlreadyInMeal = await _context.Meals.AnyAsync(m =>
                m.FoodId == addMealDTO.FoodId &&
                m.MealName.Id == addMealDTO.MealNameId);
            Validation.IfInDatabaseThrowException(foodAlreadyInMeal, "Food");
            
            var mealName = await _context.MealNames.FindAsync(addMealDTO.MealNameId);
            Validation.CheckIfNull(mealName);
            var food = await _context.Foods.FindAsync(addMealDTO.FoodId);
            Validation.CheckIfNull(food);

            var mealToAdd = new Meal
            {
                Quantity = addMealDTO.Quantity,
                MealName = mealName!,
                Food = food!,
            };
            _context.Meals.Add(mealToAdd);
            await _context.SaveChangesAsync();
            var response = ResponseBuilder.Meals([mealToAdd]).FirstOrDefault();
            return response!;
        }
    }
}