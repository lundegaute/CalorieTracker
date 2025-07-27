import { NextResponse, NextRequest } from 'next/server';
import { LoginUserDTO, ErrorResponse, LoginResponse } from '@/Types/types';
import {API_ENDPOINTS} from '@/lib/constants';

export async function POST(req: NextRequest) {
    console.log("---------- API LOGIN ROUTE ----------");
    console.log(API_ENDPOINTS.LOGIN);
    console.log("Request body:", req.body);
    const body: LoginUserDTO = await req.json();
    try {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: 'include', // Include cookies in the request
        });
        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            return NextResponse.json(errorData);
        }
        
        console.log("---------- API LOGIN ROUTE RESPONSE WITH TOKEN ----------");
        const token: string = await response.text();
        return NextResponse.json(token, { status: 200 });

    } catch (error) {
        console.log("---------- API LOGIN ROUTE ERROR ----------");
        console.error("Error during login:", error);
        const errorResponse: ErrorResponse = {
            message: { Error: ["An unexpected error occurred during login"] },
            type: "InternalServerError",
            title: "Login Error",
            status: 500
        }
        return NextResponse.json(errorResponse);
    }
}