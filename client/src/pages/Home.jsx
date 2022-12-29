import React, { useEffect, useState } from 'react'
import { showOnFeed, logout, myProfile, getYouMayKnow, followUser } from '../api'
import HomePost from '../components/posts/HomePost'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { setIsAuth } from '../Redux-store/authSlice'
import YouMayKnowCard from '../components/users/YouMayKnowCard'
import Loading from '../components/shared/Loading'

const Home = () => {

    const dispatch = useDispatch()

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    const [knownUsers, setKnownUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchAllPosts() {
            try {

                const { data } = await showOnFeed()
                setPosts(data.posts)

            } catch (error) {
                console.log(error);
            }
        }

        async function getAccountDetails() {
            try {
                const { data } = await myProfile()
                setUser(data.user)
                dispatch(setIsAuth({
                    isAuth: true,
                    user: data.user
                }))

            } catch (error) {
                console.log(error);
            }
        }

        async function getKnownUsers() {
            try {
                const { data } = await getYouMayKnow('3')
                setKnownUsers(data.users)
            } catch (error) {
                console.log(error);
            }
        }

        const task1 = fetchAllPosts()
        const task2 = getAccountDetails()
        const task3 = getKnownUsers()

        Promise
            .all([task1, task2, task3])
            .finally(() => {
                setLoading(false)
            })

    }, [])

    async function logoutUser() {
        try {
            await logout()
            window.location.reload()
        } catch (error) {
            console.log(error);
            alert("Couldn't logout ...Please try again")
        }
    }

    if (loading) return <Loading />

    return (
        <div className='container mx-auto bg-neutral-50 flex py-4 px-2'>

            <div className='w-3/12 p-4 sm:block hidden'>
                <h1 className="font-bold mb-4">People you may know</h1>

                {
                    knownUsers.length > 0 && knownUsers
                        .filter((u) => { return u._id !== user?._id })
                        .map((usr) => {
                            return <YouMayKnowCard
                                key={usr._id}
                                user={usr} />
                        })
                }
            </div>

            <div className="w-full sm:flex-1 bg-white shadow-md p-6">
                <h1 className='font-black text-2xl mt-4 mb-8'>Your Feed</h1>
                {
                    posts.map((post) => {
                        return (
                            <HomePost
                                key={post._id}
                                postId={post._id}
                                username={post.postedBy.username}
                                profilePicture={post.postedBy.profilePicture ? post.postedBy.profilePicture : null}
                                postImg={post.picture}
                                likedBy={post.likedBy}
                                likesCount={post.likedBy.length}
                                caption={post.caption ? post.caption : null}
                            />
                        )
                    })
                }
            </div>

            <div className="w-3/12 mr-2 sm:block hidden">
                <div className="m-2 w-full py-6 bg-white shadow-md">
                    <UserCircleIcon className='w-16 h-16 block mx-auto text-gray-500' />

                    <h1 className='font-bold text-center capitalize mt-2 mb-6'>{user?.name}</h1>

                    <div className='flex-center px-4'>
                        <div className='flex-center flex-col mx-6'>
                            <h2 className='font-bold'>{user?.followers?.length ? user.followers.length : 0}</h2>
                            <h6 className='font-semibold'>Followers</h6>
                        </div>
                        <div className='flex-center flex-col'>
                            <h2 className='font-bold'>{user?.following?.length ? user.following.length : 0}</h2>
                            <h6 className='font-semibold'>Following</h6>
                        </div>
                    </div>
                    <div className="block mx-auto w-max my-6">
                        <button
                            onClick={logoutUser}
                            className='w-48 h-10 rounded-full bg-red-100 hover:bg-red-300 font-bold text-red-600'>
                            Logout
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home