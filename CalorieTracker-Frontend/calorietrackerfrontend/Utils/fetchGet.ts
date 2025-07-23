import { ErrorResponse } from "@/Types/types";

async function fetchGet<T>(url: string): Promise<T | ErrorResponse> {
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
        const errorData: ErrorResponse = await res.json();
        return errorData || "An error occurred while fetching data";
    }
    const data = await res.json();
    return data as Promise<T>;
}