import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxLength: [20, "Name cannot exceed 20 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [3, "Password must be at least 6 characters"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: ""
    },
    bio: {
        type: String
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

}, { timestamps: true })

const User = mongoose.models.users || mongoose.model("users", UserModel)

export default User