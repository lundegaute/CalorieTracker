using CalorieTracker.Data;
using CalorieTracker.Models;
using CalorieTracker.HelperMethods;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.DTO;

namespace CalorieTracker.Services
{
    public class MealNameService
    {
        private readonly DataContext _context;

        public MealNameService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ResponseMealNameDTO>> GetMealNames(int userID)
        {
            var response = new List<ResponseMealNameDTO>();
            var mealNames = await _context.MealNames
                .Where(mn => mn.User.Id == userID)
                .ToListAsync();
            response = ResponseBuilder.MealName(mealNames);
            return response;
        }
    }
}