import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const DMs = ({ setShowDmScreen }) => {
    return (
        <div
            style={{ zIndex: '99999' }}
            className="w-full sm:w-1/4 transition-all h-screen fixed top-0 right-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <h1 className="font-bold text-2xl mt-4 ml-6">Messages</h1>
            <XMarkIcon
                onClick={() => setShowDmScreen(false)}
                className='absolute right-2 top-2 w-6 h-6 cursor-pointer' />

        </div>
    )
}

export default DMs