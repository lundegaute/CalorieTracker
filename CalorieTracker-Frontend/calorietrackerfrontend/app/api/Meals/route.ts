import { ErrorResponse, MealSummary, DecodedToken } from "@/Types/types";
import { NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import ValidateToken from "@/HelperFunctions/validateToken";

export async function GET(req: NextRequest) {
    console.log("---------- API ROUTE GET MEALS ----------");
    console.log(API_ENDPOINTS.MEAL);
    const token = req.cookies.get("token")?.value;
    const tokenResult: ErrorResponse = ValidateToken(token || "");
    // Handle expired and invalid token
    if ( tokenResult.title === "Token expired" || tokenResult.title === "Token invalid" || tokenResult.title === "Token not found") {
        return NextResponse.json(
            tokenResult,
            {status: tokenResult.status}
        );
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
        const data: MealSummary[] = await res.json();
        console.log(`Fetched Meal: ${data[0].name}. Calories:  ${data[0].totalCalories}`);
        return NextResponse.json(data);

    } catch (error) {
        console.log("----- API ROUTE GET MEALS ERROR -----");
        const errorResponse: ErrorResponse = {
            message: {
                Error: ["An error occurred while fetching meals from the backend"],
            },
            type: "Error",
            title: "Fetch Error",
            status: 500
        }
        console.log(`ErrorResponse: ${errorResponse.message.Error[0]}`);
        return NextResponse.json(errorResponse, { status: errorResponse.status });
    }
}

