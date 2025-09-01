import Register from '@/components/Users/Register';

function RegisterUserPage() {

    return (
        <div className="min-h-screen flex flex-col items-center p-5">
            <h1 className="text-4xl font-bold mb-6">Register</h1>
            <Register />
        </div>
    )
}

export default RegisterUserPage;