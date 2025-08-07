import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { API_ENDPOINTS } from '@/lib/constants';
import Cookies from 'js-cookie';
import ValidateToken from "@/HelperFunctions/validateToken";

interface AuthState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    checkTokenStatus: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,

            login: () => {
                set({
                    isAuthenticated: true,
                })
            },
            logout: async () => { // Clear the state and remove from localStorage
                await fetch(API_ENDPOINTS.LOGOUT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include cookies stored in the browser
                });
                set({
                    isAuthenticated: false,
                });
            },
            checkTokenStatus: async () => {
                const token = Cookies.get("token");
                if ( !token ) {
                    set({ isAuthenticated: false});
                    return;
                }
                const validation = ValidateToken(token);
                if ( !validation.isValid) {
                    console.log("----- INSIDE ZUSTAND AUTHSTORE TOKEN NOT VALID -----");
                    set({ isAuthenticated: false});
                } else {
                    set({ isAuthenticated: true});
                }
            }
        }),
        {
            name: "auth-storage", // Name of the storage key
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)