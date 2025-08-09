"use client";
import {MealNameDTO, ErrorResponse, AddMealNameDTO} from "@/Types/types";
import Button from "@mui/material/Button";
import sweetAlertInput from "@/components/SweetAlert/formInput";
import {fetchPost} from "@/Fetch/fetchPost";

function AddMealName() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("----- Add MealName from sweetalert -----");
        const mealName = {name: await sweetAlertInput()};
        if ( mealName.name ) {
            try {
                const data = await fetchPost<MealNameDTO, AddMealNameDTO>("/api/MealName", mealName);
                console.log(data);
            } catch (error) {
                console.log(error);
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