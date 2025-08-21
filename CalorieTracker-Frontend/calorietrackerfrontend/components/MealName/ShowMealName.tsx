"use client";
import {fetchGet} from "@/Fetch/fetchGet";
import { MealNameDTO } from "@/Types/types";
import {useQuery} from "@tanstack/react-query";

export function ShowMealDetailsName({mealNameId}: { mealNameId: number}) {
    console.log(mealNameId)
    const {data, isLoading, error} = useQuery<MealNameDTO>({
        queryKey: ["MealName"],
        queryFn: async () => await fetchGet<MealNameDTO>(`/api/MealName/${encodeURIComponent(mealNameId)}`),
        retry: 0,
    })
    if ( isLoading ) return (<div>Loading...</div>);
    if ( !data ) return (<div>No Data</div>);
    return (
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            Meal: {data.name}
          </h1>
    );
}