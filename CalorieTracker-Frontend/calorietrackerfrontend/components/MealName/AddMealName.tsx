"use client";
import {MealNameDTO, ErrorResponse, AddMealNameDTO} from "@/Types/types";
import Button from "@mui/material/Button";
import {sweetAlertInput} from "@/components/SweetAlert/formInput";
import {fetchPost} from "@/Fetch/fetchPost";
import {useQueryClient} from "@tanstack/react-query";
import useMealPlanStore from "../Zustand/MealPlanStore";

function AddMealName() {
    const queryClient = useQueryClient();
    const mealPlanStore = useMealPlanStore();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("----- Add MealName from sweetalert -----");
        const mealName = {name: await sweetAlertInput("Add meal name", "")};
        if ( mealName.name && mealPlanStore.mealPlanId ) {
            const newMealName: AddMealNameDTO = {
                name: mealName.name,
                mealPlanId: mealPlanStore.mealPlanId
            }
            const result = await fetchPost<MealNameDTO, AddMealNameDTO>("/api/MealName", newMealName);
            if ( result.success ) {
                queryClient.invalidateQueries({queryKey: ["MealsSummary"]});
            } else {
                alert(result.error.message.Error[0]);
            }
            
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button variant="contained" color="success" type="submit">
                Add Meal
            </Button>
        </form>
    )
}

export default AddMealName;