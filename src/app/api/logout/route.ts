import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "@/app/lib/db";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (token) {
            await pool.execute("DELETE FROM sessions WHERE token = ?", [token]);
        }

        cookieStore.delete("token");

        return NextResponse.json({ message: "Succesfully logged out" }, { status: 200 });
    } catch (error) {
        console.error("Error loging out: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    };
}