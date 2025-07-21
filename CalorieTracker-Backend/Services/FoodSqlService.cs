using CalorieTracker.Models;
using CalorieTracker.Data;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.HelperMethods;
using CalorieTracker.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CalorieTracker.Services
{
    public class FoodSqlService
    {
        private readonly DataContext _context;
        public FoodSqlService(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ResponseFoodDTO>> GetFoods()
        {
            var foods = await _context.Foods.ToListAsync();
            var response = ResponseBuilder.Foods(foods);
            return response;
        }
        public async Task<ResponseFoodDTO> GetFood(int id)
        {
            Validation.CheckIfIdInRange(id);

            var food = await _context.Foods.FindAsync(id);
            Validation.CheckIfNull(food);

            var response = ResponseBuilder.Foods([food!]);
            return response.FirstOrDefault()!;
        }
        public async Task<ResponseFoodDTO> AddFood(AddFoodDTO foodDTO)
        {
            var foodExists = await _context.Foods.AnyAsync(f => f.Name == foodDTO.Name);
            Validation.IfInDatabaseThrowException(foodExists, typeof(FoodSummarySql).Name);

            var foodToAdd = new FoodSummarySql
            {
                Name = foodDTO.Name,
                Calories = foodDTO.Calories,
                Protein = foodDTO.Protein,
                Carbohydrates = foodDTO.Carbohydrates,
                Fat = foodDTO.Fat,
            };
            await _context.Foods.AddAsync(foodToAdd);
            await _context.SaveChangesAsync();
            var getNewFood = await _context.Foods.FindAsync(foodToAdd.Id);
            var response = ResponseBuilder.Foods([getNewFood!]);
            return response.FirstOrDefault()!;
        }
        public async Task<ResponseFoodDTO> UpdateFood(int id, UpdateFoodDTO updateFoodDTO)
        {
            Validation.CheckIfIdInRange(id);
            var foodToUpdate = await _context.Foods.FindAsync(id);
            Validation.CheckIfNull(foodToUpdate);
            var foodExists = await _context.Foods.AnyAsync(f =>
                f.Name == updateFoodDTO.Name &&
                f.Id != id);
            Validation.IfInDatabaseThrowException(foodExists, typeof(FoodSummarySql).Name);

            foodToUpdate!.Name = updateFoodDTO.Name;
            foodToUpdate.Calories = updateFoodDTO.Calories;
            foodToUpdate.Protein = updateFoodDTO.Protein;
            foodToUpdate.Carbohydrates = updateFoodDTO.Carbohydrates;
            foodToUpdate.Fat = updateFoodDTO.Fat;

            _context.Foods.Update(foodToUpdate);
            await _context.SaveChangesAsync();
            var response = ResponseBuilder.Foods([foodToUpdate]);
            return response.FirstOrDefault()!;
        }
        public async Task DeleteFood(int id)
        {
            Validation.CheckIfIdInRange(id);
            var foodToDelete = await _context.Foods.FindAsync(id);
            Validation.CheckIfNull(foodToDelete);

            _context.Foods.Remove(foodToDelete!);
            await _context.SaveChangesAsync();
        }
        
    }
}