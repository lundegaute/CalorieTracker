"use client";
import MealGrid from "@/components/DataGrid/MealGrid";
function Meals() {

    return (
        <div className="min-h-screen p-5 flex gap-4 pt-15">
            <div className="flex-1 min-w-0 flex justify-center">
                <h1>Meals</h1>
            </div>
            <div className="text-2xl flex-none w-64 flex justify-center">
                <h1>Add Food Section</h1>
            </div>
            <div className="flex-1 min-w-0 flex justify-center">
                <div className="w-fit">
                    <MealGrid />
                </div>
            </div>
            <div className="flex-none w-64 flex justify-center">
                <p>Maybe stats and graphs here</p>
            </div>
        </div>
    );
}

export default Meals;