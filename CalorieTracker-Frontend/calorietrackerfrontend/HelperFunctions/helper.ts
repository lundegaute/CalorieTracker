import { MealSummary, MealDTO, MealFood } from "@/Types/types";

export const helper = { 
    buildFoodList: (meals: MealDTO[]): MealFood[] => {
        const foodList: MealFood[] = [];
        meals.forEach((meal: MealDTO) => {
            foodList.push({
                mealId: meal.id,
                quantity: meal.quantity,
                foodName: meal.food.name,
                calories: Math.round(meal.food.calories),
                protein: Math.round(meal.food.protein),
                carbohydrates: Math.round(meal.food.carbohydrates),
                fat: Math.round(meal.food.fat),
            })
        })
        return foodList;
    }
    
}
