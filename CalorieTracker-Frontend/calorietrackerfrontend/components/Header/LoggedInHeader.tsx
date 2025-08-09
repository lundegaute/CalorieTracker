"use client";
import Link from "next/link";
import ThemeSwitch from "@/components/Theme/ThemeSwitch";
import { useAuthStore } from "../Zustand/AuthStore";
import {useRouter} from 'next/navigation';

function LoggedIn() {
    const logout = useAuthStore().logout;
    const router = useRouter();
    async function handleLogout() {
        logout();
        router.push("/Auth/Login");
    }

    return (
        <nav>
            <ul className="">    
                <li>
                    <Link href={"/"} className="hover:text-emerald-300 transition-colors" onClick={handleLogout}>Logout</Link>
                </li>
            </ul>    
        </nav> 
    )
}

export default LoggedIn;