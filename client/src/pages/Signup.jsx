import React, { useState } from 'react'
import { signup } from '../api'
import { NavLink, useNavigate } from 'react-router-dom'
import { CameraIcon } from '@heroicons/react/24/outline'

const Signup = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        tel: '',
        password: '',
        profilePicture: ''
    })
    const [message, setMessage] = useState({
        state: false,
        type: '',
        text: ''
    })

    function setInfo(name, value) {
        setUser({
            ...user,
            [name]: value
        })
    }

    async function signupUser(e) {
        e.preventDefault()

        try {
            const { data } = await signup(user)

            setMessage({
                state: true,
                type: 'success',
                text: data.message
            })

            setUser({
                name: '',
                username: '',
                email: '',
                tel: '',
                password: '',
                profilePicture: ''
            })

            setTimeout(() => {
                navigate('/login')
            }, 1500)

        } catch (error) {
            console.log(error);
            setMessage({
                state: true,
                type: 'error',
                text: error.response.data.err
            })
        }
    }

    return (
        <div className='container mx-auto bg-neutral-50'>
            <div className='w-32 h-32 shadow-md mx-auto mt-6 flex justify-center items-center rounded-full border-2 border-solid border-green-500 bg-neutral-100'>
                <CameraIcon className='w-10 h-10 text-gray-600' />
            </div>

            <label
                className='block mx-auto font-bold cursor-pointer w-max mt-2 text-blue-900 text-sm'
                htmlFor="profile">
                Upload profile picture
            </label>

            {
                message.state ?
                    message.type === 'error' ?
                        <h2 className='text-center text-red-500 font-bold'>{message.text}</h2>
                        :
                        message.type === 'success' ?
                            <h2 className='text-center text-green-500 font-bold'>{message.text}</h2>
                            : <></> : <></>
            }

            <input
                onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                value={user.profilePicture}
                className='hidden'
                id='profile'
                type="file" />

            <form className='p-6 mt-4 bg-white w-max block mx-auto shadow-md'>
                <label
                    className='text-center mx-auto block w-max mt-4'
                    htmlFor="name">Name</label>
                <input
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    value={user.name}
                    placeholder='Name here...'
                    className='block bg-neutral-100 w-80 sm:w-96 h-10 mx-auto px-2'
                    type="text" name="name" id="name" />

                <label
                    className='text-center mx-auto block w-max mt-4'
                    htmlFor="username">Username</label>
                <input
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    value={user.username}
                    placeholder='Choose a username...'
                    className='block bg-neutral-100 w-80 sm:w-96 h-10 mx-auto px-2'
                    type="text" name="username" id="username" />

                <label
                    className='text-center mx-auto block w-max mt-4'
                    htmlFor="email">Email</label>
                <input
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    value={user.email}
                    placeholder='Email here...'
                    className='block bg-neutral-100 w-80 sm:w-96 h-10 mx-auto px-2'
                    type="email" name="email" id="email" />

                <label
                    className='text-center mx-auto block w-max mt-4'
                    htmlFor="tel">Contact Number</label>
                <input
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    value={user.tel}
                    placeholder='Contact number here...'
                    className='block bg-neutral-100 w-80 sm:w-96 h-10 mx-auto px-2'
                    type="tel" name="tel" id="tel" />

                <label
                    className='text-center mx-auto block w-max mt-4'
                    htmlFor="password">Password</label>
                <input
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    value={user.password}
                    placeholder='Password here...'
                    className='block bg-neutral-100 w-80 sm:w-96 h-10 mx-auto px-2'
                    type="password" name="password" id="password" />

                <button
                    onClick={signupUser}
                    className='w-48 h-12 bg-yellow-500 font-bold block mx-auto mt-8'
                    type='submit'>
                    SIGNUP
                </button>
            </form>
            <NavLink
                className='text-center w-max block mx-auto mt-8 mb-2'
                to='/login'>
                Already have an account?
                <span className='font-bold ml-1'>
                    Login
                </span>
            </NavLink>
        </div>
    )
}

export default Signup