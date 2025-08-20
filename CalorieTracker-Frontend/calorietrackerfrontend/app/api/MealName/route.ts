import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import {MealNameDTO, ErrorResponse, SuccessMessage} from "@/Types/types";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const token = req.cookies.get("token")?.value;
    console.log("---------- API ROUTE ADD A MEALNAME ----------");
    console.log(body);
    try {
        const res = await fetch(`${API_ENDPOINTS.MEAL_NAME}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        if ( !res.ok) {
            console.log("----- API ROUTE ADD MEALNAME RES NOT OK -----");
            const errorData: ErrorResponse = await res.json();
            console.log(errorData.message.Error[0]);
            return NextResponse.json(
                errorData,
                { status: errorData.status }
            )
        }
        console.log("----- API ROUTE ADD MEALNAME SUCCESS -----");
        const data = await res.json();
        return NextResponse.json(
            {
                data
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log("----- API ROUTE ADD MEALNAME ERROR");
        console.log(error);
        const errorResponse: ErrorResponse = {
            message: {
                Error: ["Server error trying to add new MealName"]
            },
            type: "Server Error",
            title: "Server error",
            status: 500,
        }
        return NextResponse.json(
            {
                errorResponse
            },
            {
                status: 500
            }
        );
    };
};

export async function PUT(req: NextRequest) {
    console.log("----- API ROUTE PUT MEALNAME -----");
    const token = req.cookies.get("token")?.value;
    const body = await req.json();
    console.log(JSON.stringify(body));
    console.log(API_ENDPOINTS.MEAL_NAME);
    try {
        const res = await fetch(API_ENDPOINTS.MEAL_NAME, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body),
        })
        if ( !res.ok ) {
            console.log("----- API ROUTE PUT MEALNAME RES NOT OK -----");
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(
                errorData,
                { status: errorData.status },
            );
        };
        const data = await res.json() as SuccessMessage;
        return NextResponse.json(
            data,
            { status: 200 }
        )
    } catch ( error ) {
        console.log("----- API ROUTE PUT MEALNAME ERROR -----");
        console.error(error);
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
    };
};