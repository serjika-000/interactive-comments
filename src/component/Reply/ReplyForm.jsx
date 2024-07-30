import { useState } from "react"
import { useDispatch } from "react-redux"
import { addReply } from "../../app/commentsSlice"

const ReplyForm = ({replyingTo,currentUser,id,showReply}) => {
    const [content,setContent] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(content === ''){
            return
        }
        setContent(content.replace(`@${replyingTo},`,''))
        dispatch(addReply({user:currentUser,content,replyingTo,id}))
        setContent('')
        showReply()
    }
    const canSend = Boolean(content) && content !== ''
  return (
    <div className='w-full bg-white p-4 rounded-xl'>
        <form onSubmit={handleSubmit} className='flex flex-row gap-4 max-lg:flex-col'>
            <img src={currentUser.image.png} alt={currentUser.username} className='w-8 h-8 max-lg:hidden'/>
            <textarea name="comment" id="comment" value={content} onChange={(e)=>setContent(e.target.value)} className='flex-1 border p-4 border-slate-200 rounded-lg' placeholder='Add a comment...'></textarea>
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

export default ReplyForm