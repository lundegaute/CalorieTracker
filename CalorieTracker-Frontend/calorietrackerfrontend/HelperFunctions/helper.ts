import { MealSummary, Meal, MealFood } from "@/Types/types";

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
    buildFoodList: (meals: Meal[]): MealFood[] => {
        const foodList: MealFood[] = [];
        meals.forEach((meal: Meal) => {
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
