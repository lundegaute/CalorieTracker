import { ErrorResponse, Meal } from "@/Types/types";
import { NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";

export async function GET(req: NextRequest) {
    console.log("---------- API ROUTE GET MEALS ----------");
    console.log(API_ENDPOINTS.MEAL);
    console.log(req.cookies.getAll());
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
        const  res = await fetch(API_ENDPOINTS.MEAL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Not strictly necessary for GET, but good practice
                "Authorization": `Bearer ${token}` // Include the token in the Authorization header
            },
        })

        if ( !res.ok ) {
            console.log("----- API ROUTE GET MEALS NOT OK -----");
            console.log("Response status:", res.status);
            const errorData: ErrorResponse = await res.json();
            return NextResponse.json(errorData, { status: errorData.status });
        }
        console.log("----- API ROUTE GET MEALS SUCCESS -----");
        const data: Meal[] = await res.json();
        console.log("Fetched meals:", data[0].mealName.name);
        return NextResponse.json(data);

    } catch (error) {
        console.log("----- API ROUTE GET MEALS ERROR -----");
        const errorResponse: ErrorResponse = {
            message: {
                error: ["An error occurred while fetching meals from the backend"],
            },
            type: "Error",
            title: "Fetch Error",
            status: 500
        }
        console.log(`ErrorResponse: ${errorResponse.message.error[0]}`);
        return NextResponse.json(errorResponse, { status: errorResponse.status });
    }
}

