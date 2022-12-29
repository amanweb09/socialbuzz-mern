import React from 'react'

const AccountPost = ({ picture }) => {
    return (
        <div className='sm:w-64 sm:h-64 bg-gray-200 mb-6 mx-2'>
            <img
                className='w-full h-full'
                src={picture}
                alt="post" />
        </div>
    )
}

export default AccountPost