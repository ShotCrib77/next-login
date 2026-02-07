"use client";
import Link from "next/link";

export default function LoginButton() {
    
    return (
        <Link href="/login" className="px-4 py-2 rounded-lg text-black bg-white border-2 text-xl">Login</Link>
    );
}