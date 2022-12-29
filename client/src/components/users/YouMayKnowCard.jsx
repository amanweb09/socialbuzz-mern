import { UserPlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useSelector } from 'react-redux';
import { followUser } from '../../api';

const YouMayKnowCard = ({ user }) => {

    const { user: stateUser } = useSelector((state) => state.auth)

    async function sendFollowRequest(_id) {
        try {
            await followUser({ _id })

        } catch (error) {
            console.log(error);
        }
    }

    const findUser = stateUser?.following?.find((u) => {return u._id === user._id})

    return (
        <div
            key={user._id}
            className='w-full flex items-center mt-4'>
            <div className="w-8 h-8 rounded-full mr-2 bg-gray-200"></div>
            <span className='capitalize font-semibold text-sm w-40'>{user.name}</span>
            {
              findUser
                    ?
                    <button
                        className='bg-green-400 rounded-sm p-2 ml-8'>
                        <CheckIcon className='w-4 h-4 text-white' />
                    </button>
                    :
                    <button
                        onClick={() => sendFollowRequest(user._id)}
                        className='bg-black rounded-sm p-2 ml-8'>
                        <UserPlusIcon className='w-4 h-4 text-white' />
                    </button>
            }
        </div>
    )
}

export default YouMayKnowCard