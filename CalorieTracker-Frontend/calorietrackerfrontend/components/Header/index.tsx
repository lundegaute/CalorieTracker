"use client";
import Link from "next/link";
import ThemeSwitch from "@/components/Theme/ThemeSwitch";


function Header() {

    return (
        <header className="bg-gray-800 text-white p-5 flex justify-between">
            <div className="flex items-center">
                <Link href="/" className="hover:underline text-2xl font-bold">Calorie Tracker</Link>
                <ThemeSwitch />
            </div>
            <nav className="mt-2">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link href="/Auth/Login" className="hover:underline">Login</Link>
                    </li>
                    <li>
                        <Link href="/Auth/Register" className="hover:underline">Register</Link>
                    </li>
                    <li>
                        <Link href="/Meals" className="hover:underline">Meals</Link>
                    </li>    
                </ul>
            </nav>
        </header>
    )
}

export default Header;