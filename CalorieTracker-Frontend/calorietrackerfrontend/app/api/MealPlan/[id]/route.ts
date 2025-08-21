import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, ResponseMealPlanDTO, SuccessMessage } from "@/Types/types";
import { API_ENDPOINTS } from "@/lib/constants";
import ValidateToken from "@/HelperFunctions/validateToken";

export async function GET(req: NextRequest, {params}: { params: { id: number}}) {
    const token = req.cookies.get("token")?.value;
    try {
        const res = await fetch(`${API_ENDPOINTS.MEALPLAN}/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
        })
    
        if( !res.ok ) {
            console.log("----- API ROUTE MEALPLAN RES NOT OK -----");
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(
                errorData,
                { status: errorData.status}
            );
        };
        const data = await res.json() as ResponseMealPlanDTO;
        return NextResponse.json(
            data,
            { status: 200 }
        );
    } catch (error) {
        console.log("----- API ROUTE MEALPLAN ERROR -----");
        const errorData: ErrorResponse = {
            message: {
                Error: ["Server Error"]
            },
            type: "Server error",
            title: "Server error",
            status: 500
            };
        return NextResponse.json(
            errorData,
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, {params}: { params: { id: string}}) {
    const token = await req.cookies.get("token")?.value;
    const tokenResult: ErrorResponse = ValidateToken(token || "");
    if ( tokenResult.title === "Token expired" || tokenResult.title === "Token invalid") {
        return NextResponse.json(
            { tokenResult},
            { status: tokenResult.status}
        );
    };
    try {
        const res = await fetch(`${API_ENDPOINTS.MEALPLAN}/${encodeURIComponent(params.id)}`, {
            method: "DELETE",
            headers: {
                "Content-Types": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if ( !res.ok ) {
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(
                errorData,
                { status: errorData.status }
            );
        };
        const data = await res.json() as SuccessMessage;
        return NextResponse.json(
            data,
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        const errorResponse: ErrorResponse = {
            message: {
                Error: ["Server error from API ROUTE MEALPLAN"]
            },
            title: "Server error",
            type: "Server error",
            status: 500
        };
        return NextResponse.json(errorResponse, {status: 500});
    }

}
