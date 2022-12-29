import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen bg-white flex justify-center pt-8'>
        <div className="w-12 h-10 rounded-full shadow-xl flex-center">
            <div className="w-8 h-8 loading rounded-full border-4 border solid border-x-yellow-600 border-b-yellow-600 border-t-transparent"></div>
        </div>
    </div>
  )
}

export default Loading