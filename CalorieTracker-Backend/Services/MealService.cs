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

        public async Task<IEnumerable<MealSummaryDTO>> GetMealsForUser(int userID)
        {
            Validation.CheckIfIdInRange(userID);
            var meals = await _context.Meals
                .Include(m => m.MealName)
                .Include(m => m.Food)
                .Where(m => m.MealName.User.Id == userID)
                .ToListAsync();
            var mealNames = await _context.MealNames
                .Include(mn => mn.User)
                .Where(mn => mn.User.Id == userID)
                .ToListAsync();
            var response = ResponseBuilder.MealSummary(mealNames, meals);
            return response;
        }
        public async Task<IEnumerable<MealDetailsDTO>> GetMealForUser(int mealNameId, int userID)
        {
            Validation.CheckIfIdInRange(mealNameId);
            Validation.CheckIfIdInRange(userID);

            var meal = await _context.Meals
                .Include(m => m.MealName)
                .Include(m => m.Food)
                .Where(m =>
                    m.MealName.User.Id == userID &&
                    m.MealName.Id == mealNameId)
                .ToListAsync();
            Validation.CheckIfNull(meal);

            var response = ResponseBuilder.MealDetails(meal);
            return response;
        }
        public async Task<ResponseMealDTO> AddMealToUser(int userID, AddMealDTO addMealDTO)
        {
            Validation.CheckIfIdInRange(userID);

            var foodAlreadyInMeal = await _context.Meals.AnyAsync(m =>
                m.FoodId == addMealDTO.FoodId &&
                m.MealName.Id == addMealDTO.MealNameId);
            Validation.IfInDatabaseThrowException(foodAlreadyInMeal, "Food");

            var mealName = await _context.MealNames
                .Include(mn => mn.User)
                .Where(mn => mn.User.Id == userID &&
                            mn.Id == addMealDTO.MealNameId)
                .FirstOrDefaultAsync();
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
        public async Task UpdateMealForUser(int id, int userID, UpdateMealDTO updateMealDTO)
        {
            // Check if id, userID are valid
            // Find Meal, check if it exists, update Quantity

            Validation.CheckIfIdInRange(id);
            Validation.CheckIfIdInRange(userID);
            Validation.ThrowErrorIfNegative(updateMealDTO.Quantity);

            var mealToUpdate = await _context.Meals
            .Where(m =>
                m.Id == id &&
                m.MealName.User.Id == userID )
            .FirstOrDefaultAsync();
            Validation.CheckIfNull(mealToUpdate);
            mealToUpdate!.Quantity = updateMealDTO.Quantity;
            _context.Update(mealToUpdate);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteFoodForUser(int id, int userID)
        {
            // Delete a single food item from meals for the logged in user
            Validation.CheckIfIdInRange(id);
            var foodToDelete = await _context.Meals
                .Include(m => m.MealName)
                .FirstOrDefaultAsync(m =>
                    m.MealName.User.Id == userID && m.Id == id);
            Validation.CheckIfNull(foodToDelete);

            _context.Remove(foodToDelete!);
            await _context.SaveChangesAsync();
        }
    }
}