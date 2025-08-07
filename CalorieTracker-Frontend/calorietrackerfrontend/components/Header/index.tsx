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
        <header className="bg-gray-800 text-white p-5 flex justify-between">
            <div className="flex items-center">
                <Link href="/" className="hover:underline text-2xl font-bold">Calorie Tracker</Link>
                <ThemeSwitch />
            </div>
            <nav className="mt-2 flex items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link href="/Meals" className="hover:underline">Meals</Link>
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