import React, { useEffect, useState } from 'react'
import { showAllComments } from '../../api'

const AllComments = ({ postId, setShowAllComments, username }) => {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getComments() {
            try {
                const { data } = await showAllComments({ postId })
                setComments(data.comments)
                setLoading(false)

            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        getComments()
    }, [])


    if (loading) return <div className='flex-center w-screen h-screen font-bold'>Loading...</div>

    return (
        <div
            style={{ background: 'rgb(0, 0, 0, 0.25)', zIndex: 100 * 9 }}
            className='w-full h-full fixed bottom-0 left-0 flex-center'>

            <div className="bg-white rounded-lg w-80 sm:w-96 h-96 relative">
                <h1
                    onClick={() => setShowAllComments(false)}
                    className='absolute top-1 right-1 text-3xl cursor-pointer font-bold hover:text-red-500'>&#215;</h1>
                <h1 className='font-bold text-center my-4'>Comments</h1>

                <div className='bg-neutral-50 p-4 m-4'>
                    {
                        comments.map((comment) => {
                            return (
                                <div
                                    key={comment._id}
                                    style={{ minHeight: '4rem', borderBottom: '1px solid #dcdcdc' }}
                                    className='w-full px-2 mt-2'>
                                    <h3 className='block font-bold text-sm text-blue-800'>{comment.userId.username}</h3>
                                    <p className='font-semibold'>{comment.comment}</p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default AllComments