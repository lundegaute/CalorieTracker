import { ErrorResponse, MealSummary, DecodedToken } from "@/Types/types";
import { NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import ValidateToken from "@/HelperFunctions/validateToken";
import path from "path";

export async function GET(req: NextRequest) {
    console.log("---------- API ROUTE GET MEALS ----------");
    console.log(API_ENDPOINTS.MEAL);
    const token = req.cookies.get("token")?.value;
    const tokenResult = ValidateToken(token || "");
    // Handle expired tokens specifically
    if (tokenResult.isExpired) {
        console.log("Token expired - clearing cookie");
        
        const response = NextResponse.json({
            message: { error: ["Your session has expired. Please login again."] },
            type: "Authorization",
            title: "Session Expired",
            status: 401,
            redirect: "/Auth/Login"
        }, { status: 401 });
        
        response.cookies.set('token', '', { expires: new Date(0), path: '/' });
        return response;
    }
    
    // Handle other invalid tokens
    if (!tokenResult.isValid) {
        console.log(`Token invalid: ${tokenResult.error}`);
        
        return NextResponse.json({
            message: { error: [tokenResult.error || "Invalid token"] },
            type: "Authorization",
            title: "Invalid Token",
            status: 401,
            redirect: "/Auth/Login"
        }, { status: 401 });
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

