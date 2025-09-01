import {API_ENDPOINTS} from "@/lib/constants";
import { ErrorResponse, SuccessMessage } from "@/Types/types";
import {NextResponse, NextRequest } from "next/server";

export async function POST (req: NextRequest) {
    const body = await req.json();

    try {
        const res = await fetch(API_ENDPOINTS.REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        if ( !res.ok) {
            const errorData: ErrorResponse = await res.json();
            return NextResponse.json(
                errorData,
                { status: errorData.status}
            )
        }
        const SuccessMessage: SuccessMessage = await res.json();
        return NextResponse.json(
            SuccessMessage,
            { status: 200}
        );
    } catch (error) {
        console.log("----- API ROUTE REGISTER USER ERROR -----");
        const errorData: ErrorResponse = {
            message: {
                Error: ["Server error in api route register user"],
            },
            title: "Server error",
            type: "Server error",
            status: 500,
        }
        return NextResponse.json(
            errorData,
            { status: 500}
        );
    }

};

