"use client";
import Link from "next/link";
import {useEffect} from "react";
import ThemeSwitch from "@/components/Theme/ThemeSwitch";
import LoggedIn from "@/components/Header/LoggedInHeader";
import LoggedOut from "@/components/Header/LoggedOutHeader";
import {useAuthStore} from "@/components/Zustand/AuthStore";

function Header() {
    const {isAuthenticated} = useAuthStore();

    return (
        <header className="w-full px-8 py-5 flex items-center justify-between 
                 sticky top-0 z-40 w-full border-b border-white/10
                 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-emerald-900/50
                 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/60
                 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.5)]">
            <div className="flex items-center">
                <Link href="/" className="hover:text-emerald-300 transition-colors text-2xl font-bold">Calorie Tracker</Link>
            </div>
            <nav className="mt-2 flex items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-emerald-300 transition-colors">Home</Link>
                    </li>
                    <li>
                        <Link href="/Meals" className="hover:text-emerald-300 transition-colors">Meals</Link>
                    </li> 
                    {isAuthenticated ? (
                        <li>
                            <LoggedIn />
                        </li>
                    ) : (
                        <li >
                            <LoggedOut />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;