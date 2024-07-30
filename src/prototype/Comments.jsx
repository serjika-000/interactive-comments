import { useState } from "react"
import IconPlus from "../assets/images/icon-plus.svg"
import IconMinu from "../assets/images/icon-minus.svg"
import IconReply from "../assets/images/icon-reply.svg"
import IconEdit from "../assets/images/icon-edit.svg"
import IconDelete from "../assets/images/icon-delete.svg"
import Reply from "./Reply"
import ReplyForm from "./ReplyForm"
import { useDispatch } from "react-redux"
import { upVote,downVote,deleteComment } from "../app/commentsSlice"

const Comments = ({comment,currentUser}) => {
    const dispatch = useDispatch()
    const [replyComment,setReplyComment] = useState(false)
    const {id,content,createdAt,score,user,replies} = comment
    // const pic = user.image.png

    const showReply =()=>{
        replyComment === false ? setReplyComment(true) : setReplyComment(false)
    }
    
  return (
    // justify-end items-end
    <div key={id} className="comments mt-4 flex flex-col  max-w-2xl mx-auto mb-2">
        <div className='comment w-full rounded-lg flex flex-row items-start p-4 mb-4 gap-4 bg-white text-slate-700'>
            <div className="score p-4 bg-slate-100 text-blue-700 font-semibold text-sm rounded-xl flex flex-col h-20 justify-between items-center">
                <button onClick={()=>dispatch(upVote({id}))}>
                    <img src={IconPlus} alt="" className=""/>
                </button>
                <span className="py-1">{score}</span>
                <button onClick={()=>dispatch(downVote({id}))}>
                    <img src={IconMinu} alt=""/>
                </button>
            </div>
            <div className="content flex flex-col gap-2">
                <div className="user flex flex-row items-center justify-between font-semibold">
                    <div className="user-info flex flex-row gap-4 items-center">
                        {/* <img src={Pic} alt={`${user.username}`} className="w-8 h-8"/> */}
                        <img src={`../avatars/image-${user.username}.png`} alt={`${user.username}`} className="w-8 h-8"/>
                        <span className="text-gray-950">{user.username}</span>
                        <span className="text-gray-500">{createdAt}</span>
                    </div>
                    <div className="btns flex flex-row gap-4">
                        {currentUser.username === user.username ? (
                        <>
                            <button onClick={()=>dispatch(deleteComment({id}))} className="text-blue-700 flex flex-row gap-2 items-center hover:opacity-40">
                                <img src={IconDelete} alt="" /> Delete
                            </button>
                            <button className="text-blue-700 flex flex-row gap-2 items-center hover:opacity-40">
                                <img src={IconEdit} alt="" /> Edit
                            </button>
                        </>
                        ): (
                            <button onClick={()=>showReply()}  className="text-blue-700 self-end flex flex-row gap-2 items-center hover:opacity-40"><img src={IconReply} alt="" /> Reply</button>
                        )}  
                    </div>
                    {/* <button onClick={()=>showReply()}  className="text-blue-700 self-end flex flex-row gap-2 items-center hover:opacity-40"><img src={IconReply} alt="" /> Reply</button> */}
                </div>
                <div className="desc text-gray-500">
                    {content}
                </div>
            </div>
        </div>
        {replyComment ? (<ReplyForm key={id} replyingTo={user.username} id={id} currentUser={currentUser}/>) : null}
        {/* // <ReplyForm /> */}
        <div className="max-w-2xl flex flex-col items-end justify-end">
            <div className="max-w-xl pl-8 self-end flex flex-col items-end justify-end border-l-2 border-l-gray-200">
                {replies?.length > 0 ? replies.map(reply=>(
                    <>
                        <Reply currentUser={currentUser} reply={reply} key={reply.id}/>
                    </>
                )):(
                    null
                )}
            </div>
        </div>
        
    </div>
  )
}

export default Comments