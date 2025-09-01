
export type FoodFromMongo = {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}
export type FoodFromSql = {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}
export type FoodDTO = {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}


export type AddFoodDTO = {
    name: string,
    calories: number,
    protein: number,
    carbohydrates: number,
    fat: number,
}

export type AddMealPlanDTO = {
    name: string;
}
export type ResponseMealPlanDTO = {
    id: number;
    name: string;
}
export type UpdateMealPlanDTO = {
    id: number;
    name: string;
}

export type AddMealNameDTO = {
    name: string;
    mealPlanId: number;
}
export type UpdateMealNameDTO = {
    id: number;
    name: string;
    mealPlanId?: number;
}
export type MealNameDTO = {
    id: number;
    name: string;
    mealPlanId: number;
}

export type MealDTO = {
    id: number;
    quantity: number;
    mealName: MealNameDTO;
    food: FoodDTO;
}
export type AddMealDTO = {
    quantity: number;
    mealNameId: number;
    foodId: number;
}
export type UpdateMealDTO = {
    id: number;
    quantity: number;
    mealNameId: number;
    foodId: number
}
export type MealSummary = {
    id: number
    mealPlanId: number;
    name: string;
    totalCalories: number | null;
    totalProtein: number | null;
    totalCarbohydrate: number | null;
    totalFat: number | null;
}
export type MealFoods = {
    mealId: number;
    quantity: number;
    foodName: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}
export type MealDetailsTotal = {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
}

export type MealTotals = {
    totalCalories: number;
    totalMeals: number;
    avgCalories: number;
}

export type Error = {
    Error: string[];
}

export type ErrorResponse = {
  "message": Error;
  "type": string;
  "title": string;
  "status": number;
  "redirect"?: string; // Optional redirect field
}

export type RegisterUserDTO = {
    email: string;
    password: string;
}

export type LoginUserDTO = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
}

export type DecodedToken = {
    exp: number;
    iat?: number;
    sub?: string;
};

export type SuccessMessage = {
    message: string
}
