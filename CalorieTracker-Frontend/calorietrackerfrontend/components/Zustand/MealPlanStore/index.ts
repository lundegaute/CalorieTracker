
import {create} from "zustand";
import {ResponseMealPlanDTO} from "@/Types/types";

interface MealPlanStore {
    mealPlanList: ResponseMealPlanDTO[];
    setMealPlanList: (mealPlanList: ResponseMealPlanDTO[]) => void;
    mealPlanId: number | null;
    setMealPlanId: (id: number | null) => void;
}

const useMealPlanStore = create<MealPlanStore>((set) => ({
    mealPlanList: [],
    setMealPlanList: (mealPlanList: ResponseMealPlanDTO[]) => set(() => ({
        mealPlanList
    })),
    mealPlanId: null,
    setMealPlanId: (id) => set(() => ({
        mealPlanId: id
    }))
}));

export default useMealPlanStore;