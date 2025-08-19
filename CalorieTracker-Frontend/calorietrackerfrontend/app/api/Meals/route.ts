import { ErrorResponse, MealSummary, DecodedToken, AddMealDTO, MealDTO } from "@/Types/types";
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
        const data: MealSummary[] = await res.json(); // List can be empty
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


export async function POST(req: NextRequest, {params}: {params: {id: string}}) {
    const body: AddMealDTO = await req.json();
    const token = req.cookies.get("token")?.value;
    console.log("---------- API ROUTE POST A MEAL ----------");
    console.log(`${API_ENDPOINTS.MEAL}`);
    // Add food item to meal
    try {
        const res = await fetch(`${API_ENDPOINTS.MEAL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        if ( !res.ok ) {
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(errorData, { status: errorData.status });
        };
        const data = await res.json() as MealDTO;
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        console.log("----- API ROUTE POST A MEAL ERROR -----");
        console.log(error);
        return NextResponse.json(
            {message: {
                Error: ["Server error in API ROUTE"]
            },
            type: "Server error",
            title: "API ROUTE ERROR",
            status: 500
            },
            {status: 500}
        );
    }
}

export async function PUT(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const body = await req.json();
    console.log("----- API MEAL ROUTE -----");
    console.log(API_ENDPOINTS.MEAL);
    try {
        const res = await fetch(API_ENDPOINTS.MEAL, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });
        if ( !res.ok ) {
            console.log("----- API MEAL UPDATE ROUTE NOT OK -----");
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(
                errorData,
                { status: errorData.status },
            );
        };
        return NextResponse.json(
            { message: "Meal updated successfylly" },
            { status: 200 }
        )
    } catch (error) {
        console.log("----- API MEAL UPDATE ROUET ERROR -----");
        const errorData: ErrorResponse = {
            message: {
                Error: ["Server Error"]
            },
            title: "Update error",
            type: "Update",
            status: 500
        }
        return NextResponse.json(
            errorData,
            { status: 500 }
        )
    }
};
