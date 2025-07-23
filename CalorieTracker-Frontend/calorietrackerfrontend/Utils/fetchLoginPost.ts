import { ErrorResponse, LoginUserDTO, LoginResponse } from '@/Types/types';

export async function FetchLoginPost(body: LoginUserDTO): Promise<string | ErrorResponse> {
    console.log("---------- FETCH LOGIN POST ----------");
    const res = await fetch("/api/Auth/Login", {  
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorData: ErrorResponse = await res.json();
        return errorData || "An error occurred while fetching data";
    }
    const data: string = await res.text();
    return data;
}