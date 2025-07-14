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

        public async Task<ResponseMealNameDTO> GetMealName(int id, int userID)
        {
            Validation.CheckIfIdInRange(id); // Check if id is greater than 0
            var mealName = await _context.MealNames.FirstOrDefaultAsync(mn => mn.Id == id && mn.User.Id == userID);
            Validation.CheckIfNull(mealName); // Check if mealName is null
            var response = ResponseBuilder.MealName([mealName!]);
            return response.FirstOrDefault()!;
        }

        public async Task<ResponseMealNameDTO> AddMealName(AddMealNameDTO mealNameDTO, int userID)
        {
            Validation.CheckIfIdInRange(userID); // ID must be 1 or higher
            var mealNameExists = await _context
                .MealNames
                .AnyAsync(mn => mn.Name == mealNameDTO.Name && mn.User.Id == userID);
            Validation.IfInDatabaseThrowException(mealNameExists, typeof(MealName).Name);

            var user = await _context.Users.FindAsync(userID);
            Validation.CheckIfNull(user);

            var newMealName = new MealName
            {
                Name = mealNameDTO.Name,
                User = user!,
            };
            await _context.MealNames.AddAsync(newMealName);
            await _context.SaveChangesAsync();
            var MealNameresponse = ResponseBuilder.MealName([newMealName]);
            return MealNameresponse.FirstOrDefault()!;
        }

        public async Task UpdateMealName(int id, UpdateMealNameDTO updateMealNameDTO, int userID)
        {
            Validation.CheckIfIdInRange(userID);
            Validation.CheckIfIdInRange(id);

            var mealNameExists = await _context
                .MealNames
                .AnyAsync(mn =>
                mn.Name.ToLower() == updateMealNameDTO.Name.Trim().ToLower() &&
                mn.User.Id == userID &&
                mn.Id != id);
            Validation.IfInDatabaseThrowException(mealNameExists, typeof(MealName).Name);

            var user = await _context.Users.FindAsync(userID);
            Validation.CheckIfNull(user);

            var MealNameInDB = await _context.MealNames.FirstOrDefaultAsync(mn => mn.Id == id);
            Validation.CheckIfNull(MealNameInDB);
            MealNameInDB!.Name = updateMealNameDTO.Name;
            _context.MealNames.Update(MealNameInDB);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteMealName(int id, int userID)
        {
            Validation.CheckIfIdInRange(userID);
            Validation.CheckIfIdInRange(id);

            var mealName = await _context.MealNames.FirstOrDefaultAsync(mn => mn.Id == id && mn.User.Id == userID);
            Validation.CheckIfNull(mealName);

            _context.MealNames.Remove(mealName!);
            await _context.SaveChangesAsync();
        }
        
    }
}