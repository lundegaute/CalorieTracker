"use client";
import { fetchGet } from "@/Fetch/fetchGet";
import { MealSummary, MealTotals, ErrorResponse } from "@/Types/types";
import {useQuery} from "@tanstack/react-query";
import useMealPlanStore from "../Zustand/MealPlanStore";


// FIX: Calculating correct calories and macro data for each meal plan
export function ShowTotals() {
    const mealPlanStore = useMealPlanStore();
    const { data, isLoading, error} = useQuery<MealSummary[], ErrorResponse, MealTotals>({
        queryKey: ["MealsSummary"],
        queryFn: async () => {
          const allMeals = await fetchGet<MealSummary[]>("/api/Meals");
          return allMeals.filter(meal => meal.mealPlanId === mealPlanStore.mealPlanId);
        },
        select: (meals) => {
            const totalCalories = meals.reduce((sum, meal) => sum += meal.totalCalories || 0, 0);
            const totalMeals = meals.length;
            const avgCalories = totalCalories ? Math.round(totalCalories / totalMeals) : 0;
            return { totalCalories, totalMeals, avgCalories };
        },
        retry: 0,
    });

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message.Error[0]}</div>
    if (!data) return <div>No Data</div>
    return (
        <div className="space-y-3">
            <InfoCard title={"Total Meals"} value={data.totalMeals || 0}/>
            <InfoCard title={"Total Calories"} value={Math.round(data.totalCalories) || 0}/>
            <InfoCard title={"Avg Kcal / Meal"} value={data.avgCalories || 0}/>
        </div>
    )

}

function InfoCard({ title, value }: { title: string; value: number;}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 hover:bg-white/10 transition">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-1 text-xl font-semibold text-emerald-300 tabular-nums">{value}</p>
    </div>
  );
}