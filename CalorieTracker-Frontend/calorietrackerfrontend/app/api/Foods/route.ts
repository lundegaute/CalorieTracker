import {NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { ErrorResponse, FoodFromSql } from "@/Types/types";

export async function POST(req: NextRequest) {
    console.log("----- API ADD FOOD ROUTE -----");
    const token = req.cookies.get("token")?.value;
    const body = await req.json();
    console.log(API_ENDPOINTS.FOODSQL);

    try {
        const res = await fetch(API_ENDPOINTS.FOODSQL, {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body),
        })
        if( !res.ok ) {
            console.log("----- API ADD FOOD ROUTE NOT OK -----");
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(
                errorData,
                { status: errorData.status}
            );
        };
        const data = await res.json() as FoodFromSql;
        return NextResponse.json(
            data,
            { status: 200 }
        );

    } catch (error) {
        console.log("----- API ADD FOOD ROUTE ERROR -----");
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
        );
    };
};