import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(req: NextRequest) {
    try {

        const userId = await getDataFromToken(req);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            user
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}