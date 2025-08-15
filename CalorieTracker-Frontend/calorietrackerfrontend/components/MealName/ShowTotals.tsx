"use client";
import { fetchGet } from "@/Fetch/fetchGet";
import { MealSummary, MealTotals } from "@/Types/types";
import {useQuery} from "@tanstack/react-query";


export function ShowTotals() {
    const { data, isLoading, error} = useQuery<MealSummary[], Error, MealTotals>({
        queryKey: ["MealsSummary"],
        queryFn: async () => fetchGet<MealSummary[]>("/api/Meals"),
        select: (meals) => {
            const totalCalories = meals.reduce((sum, meal) => sum += meal.totalCalories || 0, 0);
            const totalMeals = meals.length;
            const avgCalories = totalCalories ? Math.round(totalCalories / totalMeals) : 0;
            return { totalCalories, totalMeals, avgCalories };
        },
    });

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (!data) return <div>No Data</div>
    return (
        <div className="space-y-3">
            <InfoCard title={"Total Meals"} value={data.totalMeals || 0}/>
            <InfoCard title={"Total Calories"} value={data.totalCalories || 0}/>
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