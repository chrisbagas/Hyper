import React from "react";

export default function Home() {
  return <>
    <div>
      <div className="w-full h-full flex flex-col px-16 mt-12 space-y-8">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Apex Legends Stats</h1>
          <h2 className="">Check Apex Legends Player Statistics</h2>
        </div>

        <div className="mx-auto w-full max-w-sm flex flex-col space-y-2">
          <input
            type="text"
            id="title"
            placeholder="Enter Origin Username"
            className="input input-bordered w-full bg-base-2 border-base-3 placeholder:text-base-4 text-neutral-0"
          />
          <button className="btn transition-all text-white bg-blue-500 hover:bg-blue-600">
            Search
          </button>
        </div>

      </div>
    </div >
  </>
}
