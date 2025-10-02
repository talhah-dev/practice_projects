import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest) {
    try {

        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({
                error: "Token is required"
            }, {
                status: 400
            })
        }

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({
                error: "Invalid token"
            }, {
                status: 400
            })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}