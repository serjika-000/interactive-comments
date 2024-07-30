import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { replyReply } from '../../app/commentsSlice'

const ReplyComment = ({replyingTo,currentUser,commentId,showReply}) => {
    const [content,setContent] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(content === ''){
            return
        }
        dispatch(replyReply({user:currentUser,content,replyingTo,commentId}))
        setContent('')
        showReply()
    }
    const canSend = Boolean(content) && content !== ''

    return (
    <div className='w-full max-w-xl bg-white p-4 rounded-lg self-end'>
        <form onSubmit={handleSubmit} className='flex flex-row gap-4 max-lg:flex-col'>
            <img src={currentUser.image.png} alt={currentUser.username} className='w-8 h-8 max-lg:hidden'/>
            <textarea name="comment" id="comment" value={content} onChange={(e)=>setContent(e.target.value)} className='flex-1 border p-4 border-slate-200 rounded-lg' placeholder='Add a reply...'></textarea>
            <button className='text-white h-12 bg-blue-800 uppercase font-bold px-6 py-2 rounded-lg hover:opacity-40 max-lg:hidden'>Send</button>
            <div className='lg:hidden flex flex-row justify-between items-center'>
                <img src={currentUser.image.png} alt={currentUser.username} className='w-8 h-8'/>
                <button disabled={!canSend} 
                    className='text-white h-12 bg-blue-800 uppercase font-bold px-6 py-2 rounded-lg hover:opacity-40'
                >Send</button>
            </div>
        </form>
    </div>
  )
}

export default ReplyComment