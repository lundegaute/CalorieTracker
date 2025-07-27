import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { API_ENDPOINTS } from '@/lib/constants';

interface AuthState {
    token: string | null;
    email: string | null;
    isAuthenticated: boolean;
    login: (token: string, userEmail: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            email: null,
            isAuthenticated: false,

            login: (token: string, userEmail: string) => {
                set({
                    token: token,
                    email: userEmail,
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
                    token: null,
                    email: null,
                    isAuthenticated: false,
                });
            
            },
        }),
        {
            name: "auth-storage", // Name of the storage key
            partialize: (state) => ({
                token: state.token,
                user: state.email,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)