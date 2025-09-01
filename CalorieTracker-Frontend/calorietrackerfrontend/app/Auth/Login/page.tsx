import Login from '@/components/Users/Login';

function LoginPage() {

    return (
        <div className="min-h-screen flex flex-col items-center p-5">
            <h1 className="text-4xl font-bold mb-6">Login</h1>
            <Login />
        </div>
    )
}

export default LoginPage;