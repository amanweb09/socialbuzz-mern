import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { login } from '../api'
import { setIsAuth } from '../Redux-store/authSlice'

const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email_username: '',
        password: ''
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

    async function loginUser(e) {
        e.preventDefault()

        try {
            const { data } = await login(user)

            dispatch(setIsAuth({ isAuth: true, user: data.user }))

            setMessage({
                state: true,
                type: 'success',
                text: data.message
            })

            setUser({
                email_username: '',
                password: ''
            })

            setTimeout(() => {
                navigate('/')
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
            <h1 className='text-center mt-12 mb-2 sm:mb-4 text-2xl sm:text-4xl font-bold'>Welcome</h1>
            <h3 className='text-center mb-10'>Login to your <span className='text-blue-900 font-bold'>SOCIALBUZZ</span> account</h3>

            {
                message.state ?
                    message.type === 'error' ?
                        <h2 className='text-center text-red-500 font-bold'>{message.text}</h2>
                        :
                        message.type === 'success' ?
                            <h2 className='text-center text-green-500 font-bold'>{message.text}</h2>
                            : <></> : <></>
            }
            <form className='bg-white w-11/12 sm:w-max shadow-md block mx-auto py-4 px-2 sm:p-6'>
                <label
                    className='text-center font-semibold mx-auto block w-max mt-4'
                    htmlFor="name">Username or email</label>
                <input
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    value={user.email_username}
                    placeholder='Username or email here...'
                    className='block bg-gray-200 w-80 sm:w-96 h-10 mx-auto px-2'
                    type="text" name="email_username" id="usernameoremail" />

                <label
                    className='text-center font-semibold mx-auto block w-max mt-4'
                    htmlFor="password">Password</label>
                <input
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    value={user.password}
                    placeholder='Password here...'
                    className='block bg-gray-200 w-80 sm:w-96 h-10 mx-auto px-2'
                    type="password" name="password" id="password" />

                <button
                    onClick={loginUser}
                    className='w-48 h-12 bg-yellow-500 hover:bg-yellow-600 font-bold block mx-auto mt-8'
                    type='submit'>
                    Login
                </button>
            </form>

            <NavLink
                className='text-center w-max block mx-auto mt-8 mb-2'
                to='/signup'>Don't have an account? <span className='font-bold'>Signup</span></NavLink>
            <NavLink
                className='text-center w-max block mx-auto font-semibold'
                to='/'>Forgot password? </NavLink>
        </div>
    )
}

export default Login