import React from "react"

const PartyPlayerList = (props: any) => {
    return (
        <>
            <div className="flex flex-col justify-start w-full max-w-4xl p-8 bg-gray-700 text-white">
            <div className="flex flex-row">
                <div className="text-4xl font-bold">
                Player List
                </div>
                <div className="bg-gray-500 p-2 ml-10 rounded-lg font-bold">
                4/5
                </div>
            </div>
            <div className="flex flex-row max-w-full justify-between bg-gray-500 p-4 my-4 rounded-xl align-bottom">
                <div className="flex flex-row">
                <img className="w-12 h-12 rounded-full object-cover"
                    src="https://media.hitekno.com/thumbs/2022/09/20/49670-meme-amogus/730x480-img-49670-meme-amogus.jpg" 
                />
                <div className="flex flex-col ml-6">
                    <h2 className="font-semibold text-lg mb-1">Player 1</h2>
                    <h3>Matches: 100 | K/D: 1 | WR: 50%</h3>
                </div>
                </div>
            </div>
            <div className="flex flex-row max-w-full justify-between bg-gray-500 p-4 my-4 rounded-xl align-bottom">
                <div className="flex flex-row">
                <img className="w-12 h-12 rounded-full object-cover"
                    src="https://media.hitekno.com/thumbs/2022/09/20/49670-meme-amogus/730x480-img-49670-meme-amogus.jpg" 
                />
                <div className="flex flex-col ml-6">
                    <h2 className="font-semibold text-lg mb-1">Player 2</h2>
                    <h3>Matches: 100 | K/D: 1 | WR: 50%</h3>
                </div>
                </div>
                <button className="btn btn-circle bg-red-600 border-red-700 hover:bg-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="flex flex-row max-w-full justify-between bg-gray-500 p-4 my-4 rounded-xl align-bottom">
                <div className="flex flex-row">
                <img className="w-12 h-12 rounded-full object-cover"
                    src="https://media.hitekno.com/thumbs/2022/09/20/49670-meme-amogus/730x480-img-49670-meme-amogus.jpg" 
                />
                <div className="flex flex-col ml-6">
                    <h2 className="font-semibold text-lg mb-1">Player 3</h2>
                    <h3>Matches: 100 | K/D: 1 | WR: 50%</h3>
                </div>
                </div>
                <button className="btn btn-circle bg-red-600 border-red-700 hover:bg-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="flex flex-row max-w-full justify-between bg-gray-500 p-4 my-4 rounded-xl align-bottom">
                <div className="flex flex-row">
                <img className="w-12 h-12 rounded-full object-cover"
                    src="https://media.hitekno.com/thumbs/2022/09/20/49670-meme-amogus/730x480-img-49670-meme-amogus.jpg" 
                />
                <div className="flex flex-col ml-6">
                    <h2 className="font-semibold text-lg mb-1">Player 4</h2>
                    <h3>Matches: 100 | K/D: 1 | WR: 50%</h3>
                </div>
                </div>
                <button className="btn btn-circle bg-red-600 border-red-700 hover:bg-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="flex flex-row max-w-full bg-gray-500 p-4 my-4 rounded-xl align-bottom">
                <div className="w-12 h-12 bg-gray-200 rounded-full object-cover">
                </div>
                <h2 className="font-semibold text-lg ml-6">
                    Empty Slot
                </h2>
                </div>
            </div>
        </>
    )
}

export {PartyPlayerList};