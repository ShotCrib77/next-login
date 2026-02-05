import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";

export async function POST(request: NextRequest) {
    try {
        const { usernameOrEmail , password } = await request.json();

        const sqlSelect = "SELECT user_id, password_hash FROM users WHERE username = ? OR email = ?";
        const resultSelect = await pool.execute(sqlSelect, [usernameOrEmail.toLowerCase(), usernameOrEmail.toLowerCase()]);
        const rows = resultSelect[0] as RowDataPacket[];

        if (rows.length === 0) {
            return NextResponse.json({ message: "Wrong Username/Email or Password" }, { status: 401 });
        }

        const user = rows[0];
        const matches = await bcrypt.compare(password, user.password_hash);

        if (!matches) {
            return NextResponse.json({ message: "Wrong Username/Email or Password" }, { status: 401 });
        }
        
        const token = randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);

        const sqlInsert = "INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)";
        await pool.execute(sqlInsert, [token, user.user_id, expiresAt]);

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        });

        return NextResponse.json({ message: "Succesfully logged in" }, { status: 200 });

    } catch (error) {
        console.error("Error loging in: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    };
}