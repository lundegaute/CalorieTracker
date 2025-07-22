
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


