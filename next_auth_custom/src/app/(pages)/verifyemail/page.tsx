"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"

const VerifyEmail = () => {
    const [token, setToken] = useState("")
    const [message, setMessage] = useState("Verifying your email...")


    useEffect(() => {
        const url = window.location.search.split("=")[1]
        setToken(url || "")
    }, [])

    useEffect(() => {
        if (token) {
            verifyEmail()
        }
    }, [token])

    const verifyEmail = async () => {
        try {
            await axios.post("/api/auth/verifyemail", { token })
            setMessage("✅ Your email has been successfully verified!")
        } catch (error) {
            setMessage("❌ Verification failed. Invalid or expired token.")
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6">Verify Your Email</h1>

            <p className="mb-6 text-gray-300">{message}</p>

            <button
                onClick={verifyEmail}
                className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition font-semibold"
            >
                Verify Again
            </button>
        </div>
    )
}

export default VerifyEmail
