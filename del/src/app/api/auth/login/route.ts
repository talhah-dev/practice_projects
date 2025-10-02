import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

connect()

export async function POST(req: NextRequest) {
    try {

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({
                error: "Please fill all the fields"
            }, {
                status: 400
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                error: "User does not exist"
            }, {
                status: 400
            })
        }

        if (user.password !== password) {
            return NextResponse.json({
                error: "Invalid password"
            }, {
                status: 400
            })
        }

        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!)

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response


    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}