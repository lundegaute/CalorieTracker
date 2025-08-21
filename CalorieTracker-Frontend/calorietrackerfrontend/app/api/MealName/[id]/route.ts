import { API_ENDPOINTS } from "@/lib/constants";
import { ErrorResponse, MealNameDTO } from "@/Types/types";
import { NextResponse, NextRequest } from "next/server";
import ValidateToken from "@/HelperFunctions/validateToken";

export async function GET(req: NextRequest, {params}: { params: {id: number}}) {
    console.log("----- WE IN HERE -----" );
    // ----- Handle expired and invalid token
    const token = req.cookies.get("token")?.value;
    const tokenResult: ErrorResponse = ValidateToken(token || "");
    if ( tokenResult.title === "Token expired" || tokenResult.title === "Token invalid") {
        return NextResponse.json(
            { tokenResult},
            { status: tokenResult.status}
        );
    };
    console.log(`${API_ENDPOINTS.MEAL_NAME}/${params.id}`);
    try {
        const res = await fetch(`${API_ENDPOINTS.MEAL_NAME}/${params.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        if ( !res.ok ) {
            console.log("----- API ROUTE GET A MEALNAME NOT OK -----");
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(
                errorData,
                { status: errorData.status }
            );
        };
        const data = await res.json() as MealNameDTO;
        return NextResponse.json(
            data,
            { status: 200 }
        );
    } catch (error) {
        console.log("----- API ROUTE GET MEALNAME CATCH ERROR -----");
        console.log(error);
        return NextResponse.json(
            {
                message: {
                    Error: ["Server error from GET mealname by ID route"]
                },
                type: "Server Error",
                title: "Server Error",
                status: 500
            },
            {
                status: 500
            }
        )
    }
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}} ) {
    console.log("----- API DELETE -----");
    console.log(API_ENDPOINTS.MEAL_NAME + "/" + params.id);

    // ----- Handle expired and invalid token
    const token = req.cookies.get("token")?.value;
    const tokenResult: ErrorResponse = ValidateToken(token || "");
    if ( tokenResult.title === "Token expired" || tokenResult.title === "Token invalid") {
        return NextResponse.json(
            { tokenResult},
            { status: tokenResult.status}
        );
    };

    try {
        const res = await fetch(`${API_ENDPOINTS.MEAL_NAME}/${encodeURIComponent(params.id)}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if ( !res.ok ) {
            console.log("----- API DELETE RES NOT OK -----");
            const errorResponse = await res.json();
            return NextResponse.json(
                { errorResponse},
                { status: errorResponse.status}
            );
        };
        console.log("----- API DELETE OK -----");
        return new NextResponse (null, {status: 204})

    } catch (error) {
        console.log("----- API DELETE CATCH ERROR -----");
        console.log(error);
        return NextResponse.json(
            {
                message: {
                    Error: ["Server error from API Delete Meal Route"]
                },
                type: "Server Error",
                title: "Server Error",
                status: 500
            },
            {
                status: 500
            }
        )
    }
}