import { MealDetails } from "@/components/DataGrids/MealDetails";


function Meal({params}: {params: { id: string }}) {

    return (
        <div className="min-h-screen p-5 flex gap-5 pt-15 flex-col">
                    <div className="flex justify-center pb-5">
                        <h1 className="text-4xl">Meals</h1>
                    </div>
                    <div className="flex gap-4 w-full">
                        <div className="text-2xl flex-none w-64 flex justify-center">
                            <h1>Add Food Section</h1>
                        </div>
                        <div className="flex-1 min-w-0 flex justify-center">
                            <div className="w-full max-w-6xl">
                                <MealDetails id={parseInt(params.id)} />
                            </div>
                        </div>
                        <div className="text-2xl flex-none w-64 flex justify-center">
                            <p>Maybe stats and graphs here</p>
                        </div>
                    </div>
                </div>
    )
}

export default Meal;