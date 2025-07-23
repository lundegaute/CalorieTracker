
export type Food = {
    id: number;
    Name: string;
    Calories: number;
    Protein: number;
    Carbohydrates: number;
    Fat: number;
}

export type MealName = {
    id: number;
    Name: string;
}

export type Meal = {
    id: number;
    Quantity: number;
    MealName: MealName;
    Food: Food;
}
export type MealSummary = {
    MealNameId: number;
    MealName: string;
    TotalCalories: number;
    TotalProtein: number;
    TotalCarbohydrates: number;
    TotalFat: number;
}

export type Error = {
    Error: string[];
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

