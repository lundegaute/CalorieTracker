import { ErrorResponse } from "@/Types/types";

export async function fetchPut<T, bodyType>(url: string, body: bodyType)
    : Promise<{success: true, data: T} | {success: false, error: ErrorResponse}> {
    console.log("----- FETCHPUT -----");
    console.log(url);
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });
    if ( !res.ok) {
        const error: ErrorResponse = await res.json();
        return {success: false, error};
    }

    // If res is ok: return data
    const data: T = await res.json();
    return {success: true, data: data};

}
    
    
