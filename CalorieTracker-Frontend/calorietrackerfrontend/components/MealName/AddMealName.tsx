"use client";
import {MealNameDTO, ErrorResponse, AddMealNameDTO} from "@/Types/types";
import Button from "@mui/material/Button";
import sweetAlertInput from "@/components/SweetAlert/formInput";
import {fetchPost} from "@/Fetch/fetchPost";
import {useQueryClient} from "@tanstack/react-query";

function AddMealName() {
    const queryClient = useQueryClient();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("----- Add MealName from sweetalert -----");
        const mealName = {name: await sweetAlertInput()};
        if ( mealName.name ) {
            const result = await fetchPost<MealNameDTO, AddMealNameDTO>("/api/MealName", mealName);
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