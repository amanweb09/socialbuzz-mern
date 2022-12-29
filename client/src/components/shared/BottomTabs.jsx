import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeIcon, PlayIcon, PlusCircleIcon, HeartIcon } from '@heroicons/react/24/outline'

const BottomTabs = () => {

    const navigate = useNavigate()
    return (
        <div
            style={{ height: '12vh' }}
            className='mx-auto w-full sticky bottom-0 left-0 flex items-center justify-evenly h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>

            <HomeIcon
                onClick={() => navigate('/')}
                className='cursor-pointer text-black transition-all hover:text-yellow-500 w-8 h-8 sm:w-10 sm:h-10 sm:mx-6' />

            <PlayIcon
                // onClick={() => navigate('/reels')}
                className='cursor-pointer text-black transition-all hover:text-yellow-500 w-8 h-8 sm:w-10 sm:h-10 sm:mx-6' />

            <PlusCircleIcon
                onClick={() => navigate('/create-post')}
                className='cursor-pointer text-black transition-all hover:text-yellow-500 w-8 h-8 sm:w-10 sm:h-10 sm:mx-6' />

            <HeartIcon
                onClick={() => navigate('/notifications')}
                className='cursor-pointer text-black transition-all hover:text-yellow-500 w-8 h-8 sm:w-10 sm:h-10 sm:mx-6' />

            <div
                onClick={() => navigate('/profile')}
                className='cursor-pointer text-black transition-all hover:text-yellow-500 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-solid border-green-600 bg-gray-200'></div>

        </div>
    )
}

export default BottomTabs