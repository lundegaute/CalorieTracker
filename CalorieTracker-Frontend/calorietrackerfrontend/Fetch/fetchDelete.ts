import {ErrorResponse} from "@/Types/types";
import {useAuthStore} from "@/components/Zustand/AuthStore";

export async function fetchDelete(url: string, id: string) {
    try {
        console.log("----- FETCH DELETE -----");
        const res = await fetch(`${url}/${encodeURIComponent(id)}`, {
            method: "DELETE",
            credentials: "include",
        });

        if( !res.ok ) {
            console.log("----- FETCH DELETE NOT OK -----");
            const errorResponse: ErrorResponse = await res.json();
            if ( errorResponse.type === "Authorization") {
                alert("Access only for users");
                useAuthStore.getState().checkTokenStatus();
                window.location.href = errorResponse.redirect || "/Auth/Login"; // Redirect to login if specified in error response
                return;
            }
            console.log(errorResponse.title);
            return;
        }
        console.log("----- FETCH DELETE SUCCESS -----");
        console.log("Is Deleted:", res.status);

    } catch (error) {
        console.log("----- FETCH DELETE CATCH ERROR -----");
        const errorData = error as ErrorResponse;
        console.log(errorData.message.Error[0]);
        return;
    }

}