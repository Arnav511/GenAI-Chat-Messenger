import React from 'react'

function ChatBubbles({ message, type }) {
    return (
        <>
            {type === 'ai' &&
            <div class="flex flex-col py-3">
                <div style={{maxWidth : "80%"}} class="relative p-5 w-fit rounded-lg border border-gray-100 bg-gray-200 shadow-lg">
                    <div style={{rotate : "135deg", left : "-9px"}} class="absolute top-2.5 h-4 w-4 transform border-r border-b border-gray-200 bg-gray-200"></div>
                    <div>
                        <p class="text-black">{message}</p>
                    </div>
                </div>
            </div>
            }

            {type === 'user' &&
            <div class="flex flex-col items-end py-3">
                <div style={{maxWidth : "80%"}} class="relative p-5 w-fit rounded-lg border border-gray-100 bg-violet-700 shadow-lg">
                    <div style={{rotate : "-45deg", right : "-9px"}} class="absolute top-2.5 h-4 w-4 transform border-r border-b border-gray-100 bg-violet-700"></div>
                    <div>
                        <p class="text-white">{message}</p>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default ChatBubbles
