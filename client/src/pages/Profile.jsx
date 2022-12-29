import React, { useEffect, useState } from 'react'
import AccountPost from '../components/posts/AccountPost'
import { useSelector } from 'react-redux'
import { logout, myProfile } from '../api'
import Loading from '../components/shared/Loading'

const Profile = () => {

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAccountDetails() {
            try {
                const { data } = await myProfile()
                setUser(data.user)
                setPosts(data.posts)
                setLoading(false)

            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        getAccountDetails()
    }, [])

    async function logoutUser() {
        try {
            await logout()

            const winLocation = 'http://localhost:3000' || `${process.env.CLIENT_ADDRESS}/profile`
            window.location.href = winLocation

        } catch (error) {
            console.log(error);
            alert("Couldn't logout ...Please try again")
        }
    }

    if (loading) return <Loading />

    return (
        <div className='container mx-auto py-4'>
            <header className='flex mx-2 items-center justify-between w-full'>
                <h2 className="font-bold text-lg">{user.username}</h2>
            </header>

            <div className='flex-center mx-auto mt-4'>
                <div className='w-20 h-20 rounded-full bg-gray-200 border-2 border-solid border-yellow-500'></div>

                <div className='px-4'>
                    {/* <h3 className="font-semibold mb-2">{user.name}</h3> */}
                    <div className='flex-center'>
                        <div className='flex-center flex-col'>
                            <h2 className='font-bold'>{posts.length ? posts.length : 0}</h2>
                            <h6 className='font-semibold'>Posts</h6>
                        </div>
                        <div className='flex-center flex-col mx-6'>
                            <h2 className='font-bold'>{user.followers.length ? user.followers.length : 0}</h2>
                            <h6 className='font-semibold'>Followers</h6>
                        </div>
                        <div className='flex-center flex-col'>
                            <h2 className='font-bold'>{user.following.length ? user.following.length : 0}</h2>
                            <h6 className='font-semibold'>Following</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center mx-auto w-max my-4">
                <button
                    onClick={logoutUser}
                    className='sm:w-48 h-10 bg-red-200 hover:bg-red-300 font-bold text-red-600 rounded-full px-6 mr-4 sm:py-0 py-2 sm:px-0'>
                    Logout
                </button>
                <button
                    className='sm:w-48 h-10 bg-indigo-200 hover:bg-indigo-300 font-bold text-indigo-500 rounded-full px-6 sm:py-0 py-2 sm:px-0'>
                    Edit Profile
                </button>
            </div>

            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 mb-4 mt-10'>
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

export default Profile