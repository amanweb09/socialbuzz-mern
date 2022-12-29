import React, { useEffect, useState } from 'react'
import { showNotifications } from '../api'
import { HeartIcon, ChatBubbleBottomCenterIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { notificationActions } from '../actions'
import Loading from '../components/shared/Loading'

const Notifications = () => {

    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    async function getAllNotifications() {
        try {
            const { data } = await showNotifications()
            setNotifications(data.notifications)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllNotifications()
    }, [])

    if (loading) return <Loading />
    return (
        <div className='min-h-screen container mx-auto bg-neutral-50 px-2 py-4 sm:p-6'>

            <div className="w-full sm:w-11/12 block mx-auto bg-white shadow-md p-6">
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold'>Notifications</h1>
                    <ArrowPathIcon
                        onClick={getAllNotifications}
                        className='w-6 h-6 cursor-pointer' />
                </div>

                <div>
                    {
                        notifications.length > 0 && notifications.map((not) => {
                            return (
                                <div className="flex items-center mt-6 my-2">

                                    {
                                        not.type === notificationActions.POST_LIKED
                                        && (
                                            <div className='w-8'>
                                                <HeartIcon className='w-6 h-6' />
                                            </div>
                                        )
                                    }
                                    {
                                        not.type === notificationActions.COMMENTED
                                        && (
                                            <div className="w-8">
                                                <ChatBubbleBottomCenterIcon className='w-6 h-6' />
                                            </div>
                                        )
                                    }
                                    <span className='flex-1 ml-2'>{not.text}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Notifications