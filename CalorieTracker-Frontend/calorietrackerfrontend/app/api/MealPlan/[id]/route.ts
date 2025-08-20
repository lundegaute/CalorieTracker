import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, ResponseMealPlanDTO } from "@/Types/types";
import { API_ENDPOINTS } from "@/lib/constants";

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
