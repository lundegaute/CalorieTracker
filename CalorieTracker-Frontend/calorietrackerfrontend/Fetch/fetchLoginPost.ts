import { ErrorResponse, LoginUserDTO } from '@/Types/types';
import { API_ENDPOINTS } from '@/lib/constants';

export async function FetchLoginPost(body: LoginUserDTO): Promise<string | ErrorResponse> {
    console.log("---------- FETCH LOGIN POST ----------");
    const res = await fetch(API_ENDPOINTS.LOGIN, {  
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorData: ErrorResponse = await res.json();
        return errorData || "An error occurred while fetching data";
    }
    console.log("---------- Login Success ----------");
    const data: string = await res.text();
    return data;
}