import {create} from 'zustand';
import { persist } from 'zustand/middleware';

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
            logout: () => {
                set({
                    token: null,
                    email: null,
                    isAuthenticated: false,
                })
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
                user: state.email,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)