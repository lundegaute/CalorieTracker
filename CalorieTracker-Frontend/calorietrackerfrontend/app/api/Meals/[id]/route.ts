import { ErrorResponse, MealNameDTO, MealFoods } from "@/Types/types";
import { NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
    console.log("---------- API ROUTE GET A MEAL ----------");
    console.log(`${API_ENDPOINTS.MEAL}/${params.id}`);

    const token = req.cookies.get("token")?.value;
    if ( !token ) {
        console.log("No token found in cookies");
        const errorResponse: ErrorResponse = {
            message: {
                error: ["Unauthorized access. No token provided."],
            },
            type: "Authorization",
            title: "No Token",
            status: 401
        }
        return NextResponse.json(errorResponse, {status: errorResponse.status});
    }
    try {
        const  res = await fetch(`${API_ENDPOINTS.MEAL}/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Not strictly necessary for GET, but good practice
                "Authorization": `Bearer ${token}` // Include the token in the Authorization header
            },
        })

        if ( !res.ok ) {
            console.log("----- API ROUTE GET A MEAL NOT OK -----");
            console.log("Response status:", res.status);
            const errorData: ErrorResponse = await res.json();
            return NextResponse.json(errorData, { status: errorData.status });
        }
        console.log("----- API ROUTE GET A MEAL SUCCESS -----");
        const data: MealFoods[] = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.log("----- API ROUTE GET A MEAL ERROR -----");
        const errorResponse: ErrorResponse = {
            message: {
                error: ["An error occurred while fetching a meal from the backend"],
            },
            type: "Error",
            title: "Fetch Error",
            status: 500
        }
        console.log(`ErrorResponse: ${errorResponse.message.error[0]}`);
        return NextResponse.json(errorResponse, { status: errorResponse.status });
    }
}

export async function POST(req: NextRequest) {
    const body: MealNameDTO = await req.json();
    console.log("---------- API ROUTE POST A MEAL ----------");
    // Add new meal
}

