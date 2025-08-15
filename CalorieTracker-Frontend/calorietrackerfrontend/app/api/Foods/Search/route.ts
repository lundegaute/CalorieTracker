import { NextRequest, NextResponse} from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import {ErrorResponse, FoodFromMongo, FoodDTO} from "@/Types/types";

export async function POST(req: NextRequest) {
    const search = await req.json();
    const token = req.cookies.get("token")?.value;
    try {
        const res = await fetch(API_ENDPOINTS.FOOD, {
            method: "POST",
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(search),
        });
    
        if ( !res.ok ) {
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(
                errorData,
                { status: errorData.status, }
            );
        };
        const data = await res.json() as FoodDTO;
        return NextResponse.json(
            data,
            { status: 200 }
        );
    } catch (error) {
        console.log("----- API SEARCH FOOD ROUTE -----");
        console.log(error);
        const errorData: ErrorResponse = {
            message: {
                Error: ["Server error"]
            },
            title: "Server error",
            type: "Server error",
            status: 500,
        }
        return NextResponse.json(
            errorData,
            { status: 500 }
        )
    }
}