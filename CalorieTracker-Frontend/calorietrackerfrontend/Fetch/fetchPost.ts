import { ErrorResponse } from "@/Types/types";

export async function FetchPost<T>(url: string, body: T): Promise<T | ErrorResponse> {

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "content-Type": "Application/json",
        },
        credentials: "include",
    });
    // Return a Type data or ErrorResponse
    try {
        // If res is not ok
        

        // If res is ok: return data


    } catch (error) {
        // Catch error

    }
    




}
    
