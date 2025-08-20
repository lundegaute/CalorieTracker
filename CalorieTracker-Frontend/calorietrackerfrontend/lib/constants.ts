
const BASE_URL = process.env.NEXT_PUBLIC_CalorieTracker_Base_Url || "http://localhost:5299/api";

export const API_ENDPOINTS = {
    base: BASE_URL,
    LOGIN: `${BASE_URL}/User/Login`,
    LOGOUT: `${BASE_URL}/User/Logout`,
    REGISTER: `${BASE_URL}/User/Register`,
    USER: `${BASE_URL}/User`,
    MEALPLAN: `${BASE_URL}/MealPlan`,
    MEAL_NAME: `${BASE_URL}/MealName`,
    MEAL: `${BASE_URL}/Meal`,
    SEARCH: `${BASE_URL}/Search`,
    FOOD: `${BASE_URL}/Foods`,
    FOODSQL: `${BASE_URL}/FoodSql`,

}
