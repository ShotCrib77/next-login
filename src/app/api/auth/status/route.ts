import { pool } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        
        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }
        
        const [rows] = await pool.execute("SELECT u.user_id, u.username FROM users u JOIN sessions s ON u.user_id = s.user_id WHERE s.token = ? AND s.expires_at > NOW()", [token]) as [RowDataPacket[], any];
        
        if (rows.length === 0) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }
        
        return NextResponse.json({ 
            authenticated: true, 
            user: { id: rows[0].user_id, username: rows[0].username }
        });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }
}