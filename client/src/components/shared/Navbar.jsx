import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'
import DMs from './DMs'


const Navbar = () => {
    const navigate = useNavigate()

    const [showDmScreen, setShowDmScreen] = useState(false)

    return (
        <div className='w-full h-20 sm:px-0 px-4 flex items-center justify-between sm:justify-center relative bg-white'>
            {
                showDmScreen && <DMs setShowDmScreen={setShowDmScreen} />
            }
            <div
                onClick={() => { navigate('/') }}
                className='flex-center cursor-pointer'>
                <img
                className='w-8 sm:w-12'
                    src="/images/logo.png"
                    alt="logo" />
                <h2
                    className="font-bold text-lg sm:text-xl">
                    SOCIAL
                    <span style={{ color: "#3b5589" }}>BUZZ</span>
                </h2>
            </div>
            <ChatBubbleBottomCenterIcon
                onClick={() => setShowDmScreen(true)}
                style={{
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
                className='absolute h-8 w-8 sm:h-10 sm:w-10 cursor-pointer sm:right-4 right-2' />
        </div>
    )
}

export default Navbar