"use client";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginUserDTO, ErrorResponse, LoginResponse } from '@/Types/types';
import { FetchLoginPost } from '@/Fetch/fetchLoginPost';
import { useRouter } from 'next/navigation'; 
import {useAuthStore} from "@/components/Zustand/AuthStore";

function Login () {
    const router = useRouter();
    const login = useAuthStore(state => state.login);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Handle login logic here
        const formData = new FormData(event.currentTarget);
        const email = formData.get("Email");
        const password = formData.get("Password");
        const loginUserDTO: LoginUserDTO = {
            email: email as string,
            password: password as string,
        }
        console.log("---------- LOGIN COMPONENT FILE ----------");
        const res = await FetchLoginPost(loginUserDTO);
        if ( typeof res === "string" ) {
            login();
            router.push("/");
        } else {
            const errorResponse = res as ErrorResponse;
            console.log("Error Response:", errorResponse);
            alert(`Error: ${errorResponse.message.error[0]}`);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField autoFocus label="Email" name="Email" type="email" variant="outlined" fullWidth margin="normal" required />
            <TextField label="Password" name="Password" type="password" variant="outlined" fullWidth margin="normal" required />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </form>
    );
}

export default Login;