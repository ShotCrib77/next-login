import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { username, password, email } = await request.json()
        
        const password_hash = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)";
        await pool.execute(sql, [username.toLowerCase(), password_hash, email.toLowerCase()])

        return NextResponse.json({ message: "User Created!" }, {status: 201});
    } catch (error: any) {
        console.error("Registration error: ", error);
        
        if (error.code === "ER_DUP_ENTRY") {
            if (error.message.includes("username")) {
                return NextResponse.json({ error: "Username already exist" }, {status: 409});
            } else if (error.message.includes("email")) {
                return NextResponse.json({ error: "Email already exist" }, {status: 409});
            }
        }
        
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}