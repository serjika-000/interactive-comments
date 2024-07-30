import Pic from "../assets/images/avatars/image-juliusomo.png"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addReply } from "../app/commentsSlice"

const ReplyForm = ({replyingTo,currentUser,id}) => {
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
    }
    const canSend = Boolean(content) && content !== ''
  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-start gap-4 max-w-full w-full mb-4 bg-white p-4 rounded-lg">
        <img src={Pic} alt="" className="w-8 h-8"/>
        <textarea name="" id="" defaultValue={`@${replyingTo}, `} onChange={(e)=>setContent(e.target.value)} className="p-4 border border-blue-800 rounded-lg w-full max-h-32 focus:outline-none">
        </textarea>
        <button disabled={!canSend} className="bg-blue-800 px-6 py-2 rounded-lg uppercase text-white font-bold hover:opacity-30">Reply</button>
    </form>
  )
}

export default ReplyForm