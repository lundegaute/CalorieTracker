"use client";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FoodFromMongo, ErrorResponse, AddFoodDTO, AddMealDTO, MealDTO, FoodDTO} from "@/Types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {fetchPost} from "@/Fetch/fetchPost";
import {fetchGet} from "@/Fetch/fetchGet";

// Ctrl+Shift+F to search for sweetalert2, to see where to add it throughout the project

export default function FoodSearchPanel({mealId}: {mealId: number}) {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const { data: foods, isLoading: isLoadingFoods, error, refetch: refetchFoods } = useQuery<FoodFromMongo[], ErrorResponse>({
    queryKey: ["foodsFromMongo", q],
    queryFn: async () => {
      const res = await fetchPost<FoodFromMongo[], string>("/api/Foods/Search", q);
      if (!res.success) throw res.error;
      return res.data;
    },
    enabled: q.length >= 3,
    retry: 0, 
  });


  async function handleAddFood(food: FoodFromMongo) {
    console.log(food);
    const foodToAdd: AddFoodDTO = {
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbohydrates: food.carbohydrates,
      fat: food.fat,
    }
    // Fetch the food based on name
    try {
      const res = await fetchGet<FoodDTO>(`/api/Foods/${encodeURIComponent(foodToAdd.name)}`);
      // If food exists in the database, we go straight to adding food to meal
      const existingFood = res;
      const addMealDTO: AddMealDTO = {
        quantity: 100,
        mealNameId: mealId,
        foodId: existingFood.id,
      };
      const addFoodToMeal = await fetchPost<MealDTO, AddMealDTO>(`/api/Meals`, addMealDTO);
      if (!addFoodToMeal.success) {
        alert(addFoodToMeal.error.message.Error[0]); // sweetalert2: Change this to use sweetalert2
      } else {
        queryClient.refetchQueries({ queryKey: ["MealDetails", mealId] });
      }
    } catch {
      console.log("Food does not exist in the database, adding it now.");
      // If food does not exist, add it to the database first, then add food to meal
      
      const addFoodToSql = await fetchPost<FoodDTO, AddFoodDTO>(`/api/Foods`, foodToAdd);
      console.log("--------------------------------------------")
      console.log(addFoodToSql.success, addFoodToSql);
      console.log("--------------------------------------------")
      if (addFoodToSql.success) {
        const newlyCreatedFood: FoodDTO = addFoodToSql.data;
        console.log("Newly created food:", JSON.stringify(newlyCreatedFood)); 
        const addMealDTO: AddMealDTO = {
          quantity: 100,
          mealNameId: mealId,
          foodId: newlyCreatedFood.id,
        };
        const addFoodToMeal = await fetchPost<MealDTO, AddMealDTO>(`/api/Meals`, addMealDTO);
        if (!addFoodToMeal.success) {
          alert(addFoodToMeal.error.message.Error[0]);
        } else {
          queryClient.refetchQueries({ queryKey: ["MealDetails", mealId] });
        }
      } else {
        alert(addFoodToSql.error.message.Error[0]);
      }
    }
  }


  return (
    <div className="space-y-3">
      <TextField
        fullWidth
        size="small"
        label="Search foods"
        placeholder="Type to search…"
        autoComplete="off"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="space-y-2 pt-2 max-h-120 overflow-y-auto pr-1">
        {foods && foods.map((f) => (
          <div
            key={f.id}
            className="rounded-lg border-2 border-emerald-400/40 bg-white/5 p-3"
          >
            <div className="text-sm font-semibold text-slate-200"> {f.name}</div>
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-300">
              <div>Kcals: <span className="font-medium text-slate-100">{Math.round(f.calories)}</span></div>
              <div>Prot: <span className="font-medium text-slate-100">{f.protein} g</span></div>
              <div>Carbs: <span className="font-medium text-slate-100">{f.carbohydrates} g</span></div>
              <div>Fat: <span className="font-medium text-slate-100">{f.fat} g</span></div>
              <div role="button" onClick={() => {handleAddFood(f)}} className="cursor-pointer flex flex-row items-center border-emerald-300 text-emerald-300  hover:text-emerald-600  transition ">
                <p className="">Add</p>
                <AddIcon className="" />
              </div>
            </div>
          </div>
        ))}

        {q.length >= 3 && foods?.length === 0 && (
          <div className="text-xs text-slate-400 text-center py-3">No results</div>
        )}
      </div>
    </div>
  );
}