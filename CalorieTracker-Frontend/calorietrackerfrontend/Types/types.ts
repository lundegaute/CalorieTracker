
export type Food = {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

export type AddMealNameDTO = {
    name: string;
}
export type MealNameDTO = {
    id: number;
    name: string;
}

export type MealDTO = {
    id: number;
    quantity: number;
    mealName: MealNameDTO;
    food: Food;
}
export type MealSummary = {
    id: number
    name: string;
    totalCalories: number | null;
    totalProtein: number | null;
    totalCarbohydrates: number | null;
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

export type Error = {
    error: string[];
}

export type ErrorResponse = {
  "message": Error;
  "type": string;
  "title": string;
  "status": number;
  "redirect"?: string; // Optional redirect field
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

