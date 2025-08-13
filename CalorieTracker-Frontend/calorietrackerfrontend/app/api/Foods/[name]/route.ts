import { ErrorResponse, MealNameDTO, MealFoods, FoodDTO } from "@/Types/types";
import { NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";

export async function GET(req: NextRequest, {params}: { params: { name: string } }) {
    console.log("---------- API ROUTE GET A FOOD ITEM ----------");
    console.log(`${API_ENDPOINTS.FOODSQL}/${encodeURIComponent(params.name)}`);

    const token = req.cookies.get("token")?.value;
    try {
        const  res = await fetch(`${API_ENDPOINTS.FOODSQL}/${encodeURIComponent(params.name)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Not strictly necessary for GET, but good practice
                "Authorization": `Bearer ${token}` // Include the token in the Authorization header
            },
        })

        if ( !res.ok ) {
            console.log("----- API ROUTE GET A FOOD ITEM NOT OK -----");
            console.log("Response status:", res.status);
            const errorData: ErrorResponse = await res.json();
            return NextResponse.json(errorData, { status: errorData.status });
        }
        console.log("----- API ROUTE GET A FOOD ITEM SUCCESS -----");
        const data: FoodDTO = await res.json();
        return NextResponse.json(data, {status: 200});

    } catch (error) {
        console.log("----- API ROUTE GET A FOOD ITEM ERROR -----");
        console.log(error);
        const errorResponse: ErrorResponse = {
            message: {
                Error: ["An error occurred while fetching a food item from the database"],
            },
            type: "Error",
            title: "Fetch Error",
            status: 500
        }
        console.log(`ErrorResponse: ${errorResponse.message.Error[0]}`);
        return NextResponse.json(errorResponse, { status: errorResponse.status });
    }
}