import React, { useEffect, useState } from 'react'
import AccountPost from '../components/posts/AccountPost'
import { useParams } from 'react-router-dom'
import { accountDetails, followUser, unfollowUser } from '../api'
import { useSelector } from 'react-redux'

const Account = () => {

    const { user } = useSelector((state) => state.auth)

    const { username } = useParams()
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [isFollowed, setIsFollowed] = useState(false)

    useEffect(() => {
        const getAccDetails = async () => {
            try {
                const { data } = await accountDetails(username)
                setProfile(data.user)

                setPosts(data.posts)
                setLoading(false)

                const userId = data.user.followers.filter((follower) => {
                    return follower._id === user._id
                })

                console.log('ourId: ', user._id, 'followers', data.user.followers);

                if (userId.length) return setIsFollowed(true) 

            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }

        getAccDetails()
    }, [])

    async function sendFollowRequest() {
        try {
            await followUser({ _id: profile._id })
            setIsFollowed(true)

        } catch (error) {
            console.log(error);
        }
    }

    async function unfollow() {
        try {
            await unfollowUser({ _id: profile._id })
            setIsFollowed(false)

        } catch (error) {
            console.log(error);
        }  
    }

    {
        if (loading) return <div className="h-screen w-screen font-bold flex-center">Loading...</div>
    }
    return (
        <div className='container mx-auto'>
            <header className='flex items-center justify-between w-full'>
                <h2 className="font-bold text-lg">{profile.username}</h2>
            </header>

            <div className='flex-center mx-auto mt-4'>
                <div className='w-20 h-20 rounded-full bg-gray-200'></div>
                <div className='flex-center px-4'>
                    <div className='flex-center flex-col'>
                        <h2 className='font-bold'>{posts.length ? posts.length : 0}</h2>
                        <h6 className='font-semibold'>Posts</h6>
                    </div>
                    <div className='flex-center flex-col mx-6'>
                        <h2 className='font-bold'>{profile.followers.length ? profile.followers.length : 0}</h2>
                        <h6 className='font-semibold'>Followers</h6>
                    </div>
                    <div className='flex-center flex-col'>
                        <h2 className='font-bold'>{profile.following.length ? profile.following.length : 0}</h2>
                        <h6 className='font-semibold'>Following</h6>
                    </div>
                </div>
            </div>

            <div className="block mx-auto w-max my-4">
                {
                    !isFollowed ?
                        <button
                            onClick={sendFollowRequest}
                            className='w-48 h-10 bg-yellow-500 hover:bg-yellow-600 font-bold'>
                            Follow
                        </button>
                        :
                        <button
                            onClick={unfollow}
                            className='w-48 h-10 bg-red-500 hover:bg-red-600 font-bold text-white'>
                            Unfollow
                        </button>
                }
            </div>

            <div className='grid grid-cols-4 mb-4 mt-10'>
                {
                    posts.length && posts.map((post) => {
                        return <AccountPost
                            key={post._id}
                            picture={post.picture} />
                    })
                }

            </div>
        </div>
    )
}

export default Account