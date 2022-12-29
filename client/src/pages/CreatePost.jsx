import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../api'

const CreatePost = () => {

    const navigate = useNavigate()

    const [details, setDetails] = useState({
        picture: "",
        caption: ""
    })

    const [flash, setFlash] = useState({
        state: false,
        type: '',
        text: ''
    })

    function setInfo(name, value) {
        setDetails({
            ...details,
            [name]: value
        })
    }

    async function create(e) {
        e.preventDefault()

        try {
            const { data } = await createPost({
                picture: details.picture,
                caption: details.caption
            })
            setFlash({
                state: true,
                type: 'success',
                text: data.message
            })

            setTimeout(() => {
                navigate('/')
            }, 1500);

        } catch (error) {
            console.log(error);
            setFlash({
                state: true,
                type: 'error',
                text: error.response.data.err
            })
        }
    }
    return (
        <div className='container mx-auto flex-center flex-col bg-neutral-50 px-4 sm:px-0'>
            {
                flash.state ?
                    flash.type === 'success' ?
                        <h2 className='my-2 font-bold text-center text-green-500'>{flash.text}</h2>
                        :
                        flash.type === 'error' ?
                            <h2 className='my-2 font-bold text-center text-red-500'>{flash.text}</h2>
                            : <></> : <></>
            }
            <div className="bg-white p-6 mx-4 sm:mx-0 shadow-md flex flex-col items-center">
                <label
                    className='font-bold block mx-auto w-max'
                    htmlFor="img_url">Image URL</label>
                <input
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    name="picture"
                    type='text'
                    placeholder='Image URL here'
                    className='sm:w-96 w-80 px-2 h-10 border-b-[2px] border-b-solid border-b-gray-300 focus:border-b-yellow-500' />

                <label
                    className='font-bold block mx-auto w-max mt-8'
                    htmlFor="img_url">Caption</label>
                <input
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    name="caption"
                    type='text'
                    placeholder='Caption here'
                    className='sm:w-96 w-80 px-2 h-10 border-b-[2px] border-b-solid sm:border-b-gray-300 focus:border-b-yellow-500' />
                <button
                    onClick={create}
                    className='w-48 h-12 bg-yellow-500 font-bold mt-6 hover:bg-yellow-600'>
                    Create
                </button>
            </div>

        </div>
    )
}

export default CreatePost