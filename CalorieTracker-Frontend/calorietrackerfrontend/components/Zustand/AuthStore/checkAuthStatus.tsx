"use client";
import { useAuthStore} from "@/components/Zustand/AuthStore";
import { useEffect } from "react";

function CheckAuthStatus() {
    const checkTokenStatus = useAuthStore(state => state.checkTokenStatus);
    console.log(`isAuthenticated status: ${useAuthStore.getState().isAuthenticated}`)
    useEffect(() => {
        checkTokenStatus();
    },[checkTokenStatus])

    return null;
}

export default CheckAuthStatus;