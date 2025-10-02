"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [data, setData] = useState({})
    const router = useRouter();

    const getProfileData = async () => {
        try {
            const res = await axios.get("/api/user/me")
            setData(res.data.user);
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await axios.get("/api/auth/logout")
            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfileData()
    }, [])

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-80 space-y-6">
                <h1 className="text-3xl font-semibold text-center text-white">Profile</h1>
                <p className="text-center text-lg text-gray-300">
                    Username: <span className="font-bold text-white">{data.name || "Loading..."}</span>
                </p>

                {/* Profile Link */}
                <Link
                    href={`/profile/${data._id}`}
                    className="text-blue-400 hover:text-blue-500 text-center block transition duration-300"
                >
                    View Profile Details
                </Link>

                {/* Logout Button */}
                <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Profile