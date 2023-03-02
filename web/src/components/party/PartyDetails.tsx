import React from "react"

const PartyDetails = (props: any) => {
    return (
        <>
            <div className="flex flex-col justify-start w-full max-w-4xl p-8 bg-gray-700 text-white">
            <div className="mb-4">
                <h1 className="text-4xl font-bold">Party Detail</h1>
            </div>
            <div>
                <h2 className="my-4 text-xl">Party Name: Nama Party</h2>
                <div className="grid grid-cols-2">
                <div className="flex flex-row">
                    <h3 className="text-white text-opacity-50">Minimal Rank:</h3> 
                    <h3 className="ml-5">Radiant</h3>
                </div>
                <div className="flex flex-row">
                    <h3 className="text-white text-opacity-50">Average K/D:</h3>
                    <h3 className="ml-5">1</h3>
                    <h3 className="ml-2 italic text-white text-opacity-75">(last 60 days)</h3>
                </div>
                <div className="flex flex-row">
                    <h3 className="text-white text-opacity-50">Average Rank:</h3>
                    <h3 className="ml-5">Radiant</h3>
                </div>
                <div className="flex flex-row">
                    <h3 className="text-white text-opacity-50">Average WR:</h3>
                    <h3 className="ml-5">50%</h3>
                    <h3 className="ml-2 italic text-white text-opacity-75">(last 60 days)</h3>
                </div>
                </div>
            </div>
            <div className="flex flex-row mt-8 mb-4">
                <button className="btn bg-blue-500 hover:bg-blue-600 mr-4">Join Discord Voice</button>
                <button className="btn bg-red-600 bg-opacity-25 border-red-500 hover:bg-opacity-100 hover:bg-red-600">Leave</button>
            </div>
            <div>
                <h3>
                Discord Voice Channel ID: 
                voice-channel-2
                </h3>
            </div>
            </div>
        </>
    )
}

export {PartyDetails};