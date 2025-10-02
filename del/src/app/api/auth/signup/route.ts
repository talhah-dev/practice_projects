import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {

        const reqBody = await req.json();
        const { name, email, password } = reqBody;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const newUser = new User({
            name,
            email,
            password
        });

        const savedUser = await newUser.save();
        await sendEmail({ email, emailType: "VERIFY", userId: newUser._id })
        const updated = await User.findById(newUser._id);
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}