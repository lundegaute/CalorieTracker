"use client";
import Link from "next/link";

function LoggedOut() {


    return (
            <nav className="">
                <ul className="flex space-x-4">    
                    <li>
                        <Link href="/Auth/Login" className="hover:text-emerald-300 transition-colors">Login</Link>
                    </li>
                    <li>
                        <Link href="/Auth/Register" className="hover:text-emerald-300 transition-colors">Register</Link>
                    </li>
                </ul>
            </nav>
        
    )
}

export default LoggedOut;