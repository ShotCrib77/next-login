"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react" ;
import SuccessfulRegistration from "../components/register/SuccessfulRegistration";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
    const router = useRouter();
    
    const handleRegister = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const newFormErrors = {
            username: !username.trim(),
            email: !email.trim() || !emailRegex.test(email.trim()),
            password: !password.trim()
        };
            
        setFormErrors(newFormErrors);
        
        if (newFormErrors.username ||newFormErrors.email || newFormErrors.password) {
            return;
        }
        
        setIsLoading(true);

        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                })
            });

            const data = await res.json()

            if (!res.ok) {
                setApiError({ error: true, message: data.error });
                console.log(data.message)
            }

            setSuccessful(true)
            setTimeout(() => {
                router.push('/login');
            }, 1500) 


        } catch (error) {
            console.error('Register error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({ username: false, email: false, password: false });
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState({ error: false, message: "" });
    const [successful, setSuccessful] = useState(false)

    return (
        <main className="min-h-screen flex flex-col justify-center items-center font-mono">
            {successful ? <SuccessfulRegistration /> : <div/>}

            <form onSubmit={handleRegister} className="flex flex-col text-center xs:w-full md:w-lg lg:w-xl xl:w-2xl p-12 gap-8 bg-white rounded-2xl text-black">
                <h1 className="font-bold text-4xl">
                    Register
                </h1>
                
                <div className="flex flex-col text-sm text-left gap-2">
                    <h2 className="text-xl">Username</h2>
                    <input 
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter username"
                        className={`text-lg outline-0 border-black border p-2 ${formErrors.username ? "border-red-600" : ""}`}
                    />
                    {formErrors.username ? <span className="text-red-600 mb-4">Input can&apos;t be empty</span> : apiError.message === "Username already exist" ? <span className="text-red-600 mb-4">Username already exists</span> : <div className="mb-4"/>}

                    <h2 className="text-xl">Email</h2>
                    <input 
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter email"
                        className={`text-lg outline-0 border-black border p-2 ${formErrors.email ? "border-red-600" : ""}`}
                    />
                    {formErrors.email ? <span className="text-red-600 mb-4">Input can&apos;t be empty or be an invalid email</span> : apiError.message === "Email already exist" ? <span className="text-red-600 mb-4">Email already exists</span> : <div className="mb-4"/>}

                    <h2 className="text-xl">Password</h2>
                    <div className="flex flex-col gap-2">
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className={`text-lg outline-0 border-black border p-2 w-full ${formErrors.password ? "border-red-600" : ""}`}
                            placeholder="Enter password"
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                    </div>

                    {formErrors.password ? <span className="text-red-600">Input can&apos;t be empty</span> : <></>}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        type="submit" 
                        disabled={isLoading}
                        className="text-xl border-2 w-fit py-2 px-4 rounded-4xl self-center"
                    >
                        Register
                    </button>
                    <Link href="/login" className="text-blue-800 text-lg">Already have an account?</Link>
                </div>
            </form>
        </main>
    );
}