import { ErrorResponse, MealNameDTO, MealFoods, AddMealDTO, MealDTO} from "@/Types/types";
import { NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
    console.log("---------- API ROUTE GET A MEAL ----------");
    console.log(`${API_ENDPOINTS.MEAL}/${encodeURIComponent(params.id)}`);

    const token = req.cookies.get("token")?.value;
    if ( !token ) {
        console.log("No token found in cookies");
        const errorResponse: ErrorResponse = {
            message: {
                Error: ["Unauthorized access. No token provided."],
            },
            type: "Authorization",
            title: "No Token",
            status: 401
        }
        return NextResponse.json(errorResponse, {status: errorResponse.status});
    }
    try {
        const  res = await fetch(`${API_ENDPOINTS.MEAL}/${encodeURIComponent(params.id)}`, {
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
                Error: ["An error occurred while fetching a meal from the backend"],
            },
            type: "Error",
            title: "Fetch Error",
            status: 500
        }
        console.log(`ErrorResponse: ${errorResponse.message.Error[0]}`);
        return NextResponse.json(errorResponse, { status: errorResponse.status });
    }
}


export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    console.log("----- API ROUTE DELETE FOOD ITEM -----");
    const token = req.cookies.get("token")?.value;
    try {
        const res = await fetch(`${API_ENDPOINTS.MEAL}/${(encodeURIComponent(params.id))}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if ( !res.ok ) {
            const errorData: ErrorResponse = await res.json();
            return NextResponse.json(
                errorData,
                {status: errorData.status}
            )
        }
        const message: string = await res.json();
        return NextResponse.json(
            message,
            { status: 200}
        );
    } catch (error) {
        console.log("----- API ROUTE DELETE FOOD ITEM ERROR -----");
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
    };
};

