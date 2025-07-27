
import { ErrorResponse } from "@/Types/types";

export async function fetchGet<T>(url: string): Promise<T> {
    console.log(`----- FETCH GET FUNCTION -----`);
    console.log(url);
    try {
        const res = await fetch(url, {
            method: "GET",
            credentials: "include", // Sending browser cookies to the next.js server router
        });
        if (!res.ok) {
            console.log("------ FETCH GET NOT OK -----"); 
            const errorData: ErrorResponse = await res.json();
            console.log(errorData.message);
            console.log(errorData.type);
            if (errorData.type === "Authorization") {
                alert("Access only for users");
                window.location.href = "Auth/Login";
            }
            throw (errorData);
        }
        const data: T = await res.json();
        return data;
    } catch (error) {
        console.error("Fetch GET request failed:", error);
        const errorResponse: ErrorResponse = {
            message: { error: ["Network error occurred while fetching data"] },
            type: "NetworkError",
            title: "Fetch Error",
            status: 500
        };
        throw (errorResponse);
    }
}