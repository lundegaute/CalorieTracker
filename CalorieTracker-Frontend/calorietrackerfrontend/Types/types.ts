
export type Food = {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

export type MealName = {
    id: number;
    name: string;
}

export type Meal = {
    id: number;
    quantity: number;
    mealName: MealName;
    food: Food;
}
export type MealSummary = {
    mealNameId: number;
    mealName: string;
    totalCalories: number;
    totalProtein: number;
    totalCarbohydrates: number;
    totalFat: number;
}
export type MealFood = {
    mealId: number;
    quantity: number;
    foodName: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

export type Error = {
    error: string[];
}

export type ErrorResponse = {
  "message": Error;
  "type": string;
  "title": string;
  "status": number;
}

export type LoginUserDTO = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
}

