import React from 'react'

const ProfileId = ({ params }) => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-80 space-y-6">
                <h1 className="text-3xl font-semibold text-center text-white">Profile Details</h1>

                <div className="text-center text-lg text-gray-300">
                    <p>Name: <span className="font-bold text-white">{params.name || "N/A"}</span></p>
                    <p>Email: <span className="font-bold text-white">{params.email || "N/A"}</span></p>
                </div>
            </div>
        </div>
    )
}

export default ProfileId
