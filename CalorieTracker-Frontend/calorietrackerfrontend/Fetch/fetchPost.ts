import { ErrorResponse } from "@/Types/types";

export async function fetchPost<T, bodyType>(url: string, body: bodyType): Promise<T | ErrorResponse> {
    console.log("----- FETCHPOST -----");
    console.log(url);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });
    try {
        if ( !res.ok) {
            const errorData: ErrorResponse = await res.json();
            throw (errorData);
        }

        // If res is ok: return data
        const data: T = await res.json();
        return data;

    } catch {
        const errorResponse: ErrorResponse = {
            message: { error: ["Network error occurred while fetching data"] },
            type: "NetworkError",
            title: "Fetch Error",
            status: 500
        };
        throw (errorResponse);
    }
    




}
    
