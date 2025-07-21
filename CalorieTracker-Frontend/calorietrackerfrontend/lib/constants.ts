
const BASE_URL = process.env.CalorieTracker_Base_Url;

export const API_URL = {
    base: BASE_URL,
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    User: `${BASE_URL}/user`,
    MealName: `${BASE_URL}/mealname`,
    Meal: `${BASE_URL}/meal`,
    Search: `${BASE_URL}/search`,
    Food: `${BASE_URL}/food`,

}
