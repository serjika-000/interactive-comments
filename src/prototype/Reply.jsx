import React, {useState} from 'react'
import IconPlus from "../assets/images/icon-plus.svg"
import IconMinu from "../assets/images/icon-minus.svg"
import IconReply from "../assets/images/icon-reply.svg"
import IconEdit from "../assets/images/icon-edit.svg"
import IconDelete from "../assets/images/icon-delete.svg"
import ReplyForm from './ReplyForm'

const Reply = ({reply,currentUser}) => {
    const [replyComment,setReplyComment] = useState(false)
    const {id,content,createdAt,score,replyingTo,user} = reply

    const showReply =()=>{
        replyComment === false ? setReplyComment(true) : setReplyComment(false)
    }
  return (
    <>
  
        <div className='reply self-end w-full rounded-lg bg-white flex flex-row items-start p-4 mb-4 gap-4 text-slate-700'>
            <div className="score p-4 bg-slate-100 text-blue-700 font-semibold text-sm rounded-xl flex flex-col h-20 justify-between items-center">
                <button>
                    <img src={IconPlus} alt="" className=""/>
                </button>
                <span className="py-1">{score}</span>
                <button>
                    <img src={IconMinu} alt=""/>
                </button>
            </div>
            <div className="content flex flex-col gap-2">
                <div className="user flex flex-row items-center justify-between font-semibold">
                    <div className="user-info flex flex-row gap-4 items-center">
                        <img src={user.image.png} alt={`${user.username}`} className="w-8 h-8"/>
                        
                        <span className="text-gray-950">{user.username}</span>
                        <span className="text-gray-500">{createdAt}</span>
                    </div>
                    {currentUser.username === user.username ? (
                        <div className="btns flex flex-row gap-4">
                            <button className="text-blue-700 self-end flex flex-row gap-2 items-center hover:opacity-40">
                                <img src={IconDelete} alt="" /> Delete
                            </button>
                            <button className="text-blue-700 self-end flex flex-row gap-2 items-center hover:opacity-40">
                                <img src={IconEdit} alt="" /> Edit
                            </button>
                        </div>
                    ): (
                        <button onClick={()=>showReply()} className="text-blue-700 self-end flex flex-row gap-2 items-center hover:opacity-40"><img src={IconReply} alt="" /> Reply</button>
                    )}
                    
                </div>
                <div className="desc text-gray-500">
                    <span className='text-blue-700 font-semibold'>@{replyingTo} </span>
                    {content}
                </div>
            </div>
        </div>
        {replyComment ? (<ReplyForm key={id}/>) : null}
    </>
  )
}

export default Reply