"use client";

import { useState } from "react";

export default function LogoutButton() {
    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await fetch("api/logout", { method: "POST" });
            window.location.reload();
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            setIsLoading(false);
        }
    }
    const [isLoading, setIsLoading] = useState(false)
    
    return (
        <button disabled={isLoading} onClick={handleLogout} className="px-4 py-2 rounded-lg text-black bg-white border-2 text-xl">Logout</button>
    );
}