"use client";
import { useAuthStore} from "@/components/Zustand/AuthStore";
import { useEffect } from "react";

function CheckAuthStatus() {
    const checkTokenStatus = useAuthStore(state => state.checkTokenStatus);
    useEffect(() => {
        checkTokenStatus();
        console.log(`isAuthenticated status: ${useAuthStore.getState().isAuthenticated}`)
    },[checkTokenStatus])

    return null;
}

export default CheckAuthStatus;