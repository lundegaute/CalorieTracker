import { MealSummary, Meal } from "@/Types/types";

export const helper = {
    buildMealSummery: (meals: Meal[]): Map<number, MealSummary> => {
        const mealMap = new Map<number, MealSummary>();
        meals.forEach((meal: Meal) => {
            if( !mealMap.get(meal.mealName.id)) {
                mealMap.set(meal.mealName.id, {
                    mealNameId: meal.mealName.id,
                    mealName: meal.mealName.name,
                    totalCalories: 0,
                    totalProtein: 0,
                    totalCarbohydrates: 0,
                    totalFat: 0,
                });
            } 
            const summary = mealMap.get(meal.mealName.id)!;
            summary.totalCalories += meal.food.calories;
            summary.totalProtein += meal.food.protein;
            summary.totalCarbohydrates += meal.food.carbohydrates;
            summary.totalFat += meal.food.fat;
        });
        return mealMap;
    },
}
