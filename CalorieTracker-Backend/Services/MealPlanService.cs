using CalorieTracker.Data;
using CalorieTracker.DTO;
using CalorieTracker.Models;
using CalorieTracker.HelperMethods;
using Microsoft.EntityFrameworkCore;


namespace CalorieTracker.Services
{
    public class MealPlanService
    {
        private readonly DataContext _context;
        public MealPlanService(DataContext context)
        {
            _context = context;
        }

        // Get all
        public async Task<IEnumerable<ResponseMealPlanDTO>> GetAllMealPlans()
        {
            var mealPlans = await _context.MealPlans.ToListAsync();
            var response = ResponseBuilder.MealPlan(mealPlans);
            return response;
        }
        // Get one
        public async Task<ResponseMealPlanDTO> GetMealPlan(int id)
        {
            Validation.CheckIfIdInRange(id);
            var mealPlan = await _context.MealPlans.FindAsync(id);
            Validation.CheckIfNull(mealPlan);

            var response = ResponseBuilder.MealPlan([mealPlan!]);
            return response.FirstOrDefault()!;
        }
        // Add
        public async Task<ResponseMealPlanDTO> AddMealPlan(AddMealPlanDTO addMealplan)
        {
            var newMealPlan = new MealPlan
            {
                Name = addMealplan.Name,
            };
            await _context.MealPlans.AddAsync(newMealPlan);
            await _context.SaveChangesAsync();
            var response = ResponseBuilder.MealPlan([newMealPlan]);
            return response.FirstOrDefault()!;
        }

        // Update
        public async Task UpdateMealPlan(UpdateMealPlanDTO updateMealPlanDTO)
        {
            Validation.CheckIfIdInRange(updateMealPlanDTO.Id);
            var mealPlanToUpdate = await _context.MealPlans.FindAsync(updateMealPlanDTO.Id);
            Validation.CheckIfNull(mealPlanToUpdate);

            mealPlanToUpdate!.Name = updateMealPlanDTO.Name;
            _context.MealPlans.Update(mealPlanToUpdate);
            await _context.SaveChangesAsync();
        }
        
        // Delete
        public async Task DeleteMealPlan(int id)
        {
            Validation.CheckIfIdInRange(id);
            var mealPlanToDelete = await _context.MealPlans.FindAsync(id);
            Validation.CheckIfNull(mealPlanToDelete);

            _context.MealPlans.Remove(mealPlanToDelete!);
            await _context.SaveChangesAsync();
        }
    }
}