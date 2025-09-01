"use client";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState} from "react";
import { fetchPost } from "@/Fetch/fetchPost";
import { SuccessMessage, RegisterUserDTO } from '@/Types/types';
import SweetAlertSuccess from "@/components/SweetAlert/Success";
import { useRouter } from "next/navigation";

function Register() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if ( password.length > 5) {
            const userToRegister: RegisterUserDTO = {
                email: email,
                password: password
            }
            const res = await fetchPost<SuccessMessage, RegisterUserDTO>("/api/Auth/Register", userToRegister);
            if ( res.success) {
                SweetAlertSuccess().then(() => { router.push("/")});
            } else {
                alert(res.error.message);
            }
        } else {
            alert("Password needs to be at least 8 characters");
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <TextField name="Email" type="email" label="Email" variant="outlined" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} value={email} required />
            <TextField name="Password" label="Password" type="password" variant="outlined" fullWidth margin="normal" onChange={ (e) => setPassword(e.target.value)} value={password} required />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
            </Button>
        </form>
    );
};

export default Register;