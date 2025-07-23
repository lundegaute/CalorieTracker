
const BASE_URL = process.env.CalorieTracker_Base_Url;

export const API_ENDPOINTS = {
    base: BASE_URL,
    LOGIN: `${BASE_URL}/User/Login`,
    REGISTER: `${BASE_URL}/User/Register`,
    USER: `${BASE_URL}/User`,
    MEAL_NAME: `${BASE_URL}/MealName`,
    MEAL: `${BASE_URL}/Meal`,
    SEARCH: `${BASE_URL}/Search`,
    FOOD: `${BASE_URL}/Food`,

}
