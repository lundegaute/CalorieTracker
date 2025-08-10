import { API_ENDPOINTS } from "@/lib/constants";
import { ErrorResponse } from "@/Types/types";
import { NextResponse, NextRequest } from "next/server";
import ValidateToken from "@/HelperFunctions/validateToken";

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