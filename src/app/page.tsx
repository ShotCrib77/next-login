"use client";

import LogoutButton from "./components/LogoutButton";
import LoginButton from "./components/LoginButton";
import { useEffect, useState } from "react";

export default function Home() {
    const checkAuth = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/status");
            const data = await res.json();
            
            setIsLoggedIn(data.authenticated);

        } catch (error) {
            console.error("Error authenticating login status", error)
        } finally {
            setLoading(false);
        }
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <div className="min-h-screen flex flex-col justify-center items-center font-mono">
            <div className="flex flex-col items-center justify-center bg-gray-50 w-1/2 rounded-md min-h-screen">
                <h1 className="bold text-5xl text-black mb-4">Welcome!</h1>
                {loading ? <p>Loading...</p> : (isLoggedIn ? <LogoutButton /> : <LoginButton />)}
            
            </div>
        


        </div>
    );
}
