"use client";
import {useQuery} from "@tanstack/react-query";
import { MealFoods, MealDetailsTotal } from "@/Types/types";
import { fetchGet } from "@/Fetch/fetchGet";

export function QuickMacros({mealNameId}: {mealNameId: number}) {
    const { data, isLoading, error } = useQuery<MealFoods[], Error, MealDetailsTotal>({
        queryKey: ["MealDetails", mealNameId],
        queryFn: async () => fetchGet<MealFoods[]>(`/api/Meals/${mealNameId}`),
        select: (foods) => {
            const totalCalories = foods.reduce((sum, food) => sum + (food.calories || 0), 0);
            const totalProtein = foods.reduce((sum, food) => sum + (food.protein || 0), 0);
            const totalCarbs = foods.reduce((sum, food) => sum + (food.carbohydrates || 0), 0);
            const totalFat = foods.reduce((sum, food) => sum + (food.fat || 0), 0);
            return { totalCalories, totalProtein, totalCarbs, totalFat};
        },
    });

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (!data) return <div>No Data</div>

    return (
        <div>
            <MiniMetric label="Total Calories" value={Math.round(data.totalCalories)} color="text-teal-300" />
            <MiniMetric label="Protein" value={Math.round(data.totalProtein * 10)/10} color="text-teal-300" />
            <MiniMetric label="Carbs" value={Math.round(data.totalCarbs * 10)/10} color="text-teal-300" />
            <MiniMetric label="Fat" value={Math.round(data.totalFat * 10)/10} color="text-teal-300" />
        </div>
    )
}



function MiniMetric({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 text-xs">
      <span className="text-slate-400">{label}</span>
      <span className={`font-semibold tabular-nums ${color || "text-slate-200"}`}>{value}</span>
    </div>
  );
}