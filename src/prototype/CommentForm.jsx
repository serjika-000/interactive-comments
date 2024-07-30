import {useState} from 'react'
import Pic from "../assets/images/avatars/image-juliusomo.png"
import { useDispatch } from 'react-redux'
import { createComment } from '../app/commentsSlice'

const CommentForm = ({currentUser}) => {
    const [content,setContent] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(content === ''){
            return
        }
        dispatch(createComment({user:currentUser,content}))
        // console.log(content,currentUser)
        setContent('')
    }
    const canSend = Boolean(content) && content !== ''

  return (
    <>
        <form onSubmit={handleSubmit} className="flex flex-row items-start gap-4 mx-auto max-w-2xl mb-4 bg-white p-4 rounded-lg">
            <img src={Pic} alt="" className="w-8 h-8"/>
            <textarea name="" id="" value={content} onChange={(e)=>setContent(e.target.value)} className="p-4 border border-blue-800 rounded-lg w-full max-h-32 focus:outline-none">
            </textarea>
            <button disabled={!canSend} className="bg-blue-800 px-6 py-2 rounded-lg uppercase text-white font-bold hover:opacity-30">Send</button>
        </form>
    </>
  )
}

export default CommentForm