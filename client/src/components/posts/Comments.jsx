import React, { useState } from 'react'
import { postComment } from '../../api'

const Comments = ({ postId, setShowComments }) => {

    const [comment, setComment] = useState("")
    const [flash, setFlash] = useState({
        state: false,
        type: '',
        text: ''
    })

    async function addComment() {

        if (comment === '') return;

        try {
            await postComment({ postId, comment })
            setFlash({
                state: true,
                type: 'success',
                text: 'Comment Added!'
            })

            setTimeout(() => {
                setShowComments(false)
            }, 1500);

        } catch (error) {
            console.log(error);
            setFlash({
                state: true,
                type: 'Error',
                text: error.response.data.err ? error.response.data.err : "Something went wrong!"
            })
        }
    }

    return (
        <div
            style={{
                background: 'rgb(0, 0, 0, 0.25)',
                zIndex: '999'
            }}
            className='w-full h-full fixed bottom-0 left-0 flex-center'>

            <div className="bg-white rounded-lg w-80 sm:w-96 h-96 relative">
                <h1
                    onClick={() => setShowComments(false)}
                    className='absolute top-1 right-1 text-3xl cursor-pointer font-bold hover:text-red-500'>&#215;</h1>
                <h1 className='font-bold text-center my-4'>Add a comment</h1>

                {
                    flash.state ?
                        flash.type === 'success' ?
                            <h2 className='my-4 font-bold text-green-500 text-center'>{flash.text}</h2>
                            :
                            flash.type === 'error' ?
                                <h2 className='my-4 font-bold text-red-500 text-center'>{flash.text}</h2>
                                :
                                <></> : <></>
                }

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='w-11/12 h-48 mt-4 sm:mt-0 sm:h-56 p-2 bg-gray-100 mx-auto block font-semibold'
                    placeholder='comment here...'
                    name="comment"
                    id="comment"
                    cols="30" />

                <button
                    onClick={addComment}
                    className='bg-green-500 hover:bg-green-600 text-white font-bold block mx-auto w-48 h-10 mt-6'>
                    ADD COMMENT
                </button>
            </div>

        </div>
    )
}

export default Comments