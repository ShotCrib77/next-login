import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";

export async function POST() {
    try {
        const result = await pool.execute("DELETE FROM sessions WHERE expires_at < NOW()");

        const amountDeleted = (result[0] as RowDataPacket).affectedRows;
        console.log(`Cleaned up ${amountDeleted} expired sessions`)

        return NextResponse.json({
            message: "Succesfull cleanup",
            deleted: amountDeleted 
        }, { status: 200 })
    } catch (error) {
        console.error("Cleanup error: ", error);
        return NextResponse.json({ message: "Failed to cleanup old sessions" }, { status: 500 })
    }
}