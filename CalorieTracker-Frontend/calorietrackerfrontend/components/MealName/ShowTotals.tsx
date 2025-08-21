"use client";
import { fetchGet } from "@/Fetch/fetchGet";
import { MealSummary, MealTotals, ErrorResponse } from "@/Types/types";
import {useQuery} from "@tanstack/react-query";
import useMealPlanStore from "../Zustand/MealPlanStore";
import { useEffect, useState } from "react";


// FIX: Calculating correct calories and macro data for each meal plan
export function ShowTotals() {
    const [totalMeals, setTotalMeals] = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);
    const [avgCalories, setAvgCalories] = useState(0);
    const mealPlanStore = useMealPlanStore();
    const { data, isLoading, error} = useQuery<MealSummary[], ErrorResponse>({
        queryKey: ["MealsSummary", mealPlanStore.mealPlanId],
        queryFn: async () => await fetchGet<MealSummary[]>("/api/Meals"),
        retry: 0,
    });

    function calculateTotals(filteredData: MealSummary[]) {
        const newTotalCals = filteredData.reduce((sum, meal) => sum += meal.totalCalories || 0, 0);
        const newTotalMeals = filteredData.length;
        const newAvgCals = Math.round(newTotalCals / newTotalMeals);

        setTotalCalories(newTotalCals);
        setTotalMeals(newTotalMeals);
        setAvgCalories(newAvgCals);
    }

    useEffect(() => {
      if ( !isLoading && data) {
        const filteredData = data.filter(meal => meal.mealPlanId === mealPlanStore.mealPlanId);
        calculateTotals(filteredData);
      }
    },[mealPlanStore.mealPlanId, data, isLoading] )

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message.Error[0]}</div>
    if (!data) return <div>No Data</div>
    return (
        <div className="space-y-3">
            <InfoCard title={"Total Meals"} value={totalMeals || 0}/>
            <InfoCard title={"Total Calories"} value={Math.round(totalCalories) || 0}/>
            <InfoCard title={"Avg Kcal / Meal"} value={avgCalories || 0}/>
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