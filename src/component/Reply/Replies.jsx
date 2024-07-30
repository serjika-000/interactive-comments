import React from 'react'
import Reply from './Reply'
import './style.css'
import { useSelector } from 'react-redux'
import { getUser } from '../../app/userSlice'

const Replies = ({replies,commentId}) => {
    const currentUser = useSelector(getUser)
  return (
    <div className='replies mb-3 max-w-2xl w-full self-end border-l-2 border-gray-300 flex flex-col gap-3'>
        {replies?.length > 0 ? replies.map(reply=>(
            <Reply key={reply.id} commentId={commentId} reply={reply} currentUser={currentUser}/>
        )):null}
    </div>
  )
}

export default Replies