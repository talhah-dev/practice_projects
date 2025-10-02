import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import nodemailer from "nodemailer";

connect()

export const sendEmail = async ({ email, emailType, userId }: any) => {
    
    try {
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: userId,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: userId,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }

        const transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            service: "gmail",
            auth: {
                user: "perfectwork0022@gmail.com",
                pass: "gxzb csmf hugp hgvy",
            },
        });

        const sendMail = await transporter.sendMail({
            from: 'perfectwork0022@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `  <p>
                        Click <a href="${process.env.DOMAIN}/verifyemail?token=${userId}">here</a> to 
                        ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                        or copy and paste the link below in your browser.
                        <br> ${process.env.DOMAIN}/verifyemail?token=${userId}
                    </p>`,
        });

        return sendMail;

    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email")
    }
}