import './style.css'
import IconPlus from '../../assets/images/icon-plus.svg'
import IconMinus from '../../assets/images/icon-minus.svg'
import IconReply from '../../assets/images/icon-reply.svg'
import IconEdit from '../../assets/images/icon-edit.svg'
import IconDelete from '../../assets/images/icon-delete.svg'
import Replies from '../Reply/Replies'
import { useDispatch } from 'react-redux'
import { upVote, downVote,deleteComment,upDateComment } from '../../app/commentsSlice'
import { useState } from 'react'
import ReplyForm from '../Reply/ReplyForm'
import { PopProvider } from '../../context/PopContext'
import { useContext } from 'react'
import DeletePopUp from '../Popup/DeletePopUp'
import {formatDistanceToNowStrict} from 'date-fns'


const Comment = ({commnet,currentUser}) => {
    const {popUp,showPopup} = useContext(PopProvider)
    const dispatch = useDispatch()
    const {id,content,createdAt,score,user,replies} = commnet
    let timeAgo = ''
    if(createdAt.includes('-')){
        timeAgo = `${formatDistanceToNowStrict(createdAt)} ago`
    }
    
    const [replyComment,setReplyComment] = useState(false)

    const [commentContent,setCommentContent] = useState(content)
    const [edit,setEdit] = useState(false)

    const showForm = ()=>{
        edit === false ? setEdit(true) : setEdit(false)
    }

    const showReply =()=>{
        replyComment === false ? setReplyComment(true) : setReplyComment(false)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(upDateComment({id,content:commentContent}))
        showForm()
      }
  return (
    <>
        <DeletePopUp popUp={popUp} showPopup={showPopup} deleteComment={deleteComment} id={id}/>
        <div key={id} className='comment w-full bg-white p-4 rounded-lg'>
            <div className="score-btns font-semibold text-blue-900 bg-slate-100 rounded-xl flex flex-col justify-between items-center py-3 max-lg:hidden">
                <button onClick={()=>dispatch(upVote({id}))}><img src={IconPlus} alt="upvote icon" className='vote hover:text-blue-700'/></button>
                <p className='score'>{score}</p>
                <button onClick={()=>dispatch(downVote({id}))}><img src={IconMinus} alt="downvote icon" className='vote hover:text-blue-700'/></button>
            </div>

            <div className="comment-content">
                <div className="user-info flex flex-row justify-between p-2">
                    <div className="user-detail flex flex-row items-center gap-4 font-semibold">
                        <img src={user.image.png} alt={`${user.username}`} className='w-8 h-8'/>
                        <p className='text-gray-800'>{user.username}</p>
                        {currentUser.username === user.username ? (<p className='info text-white text-center bg-blue-700 pb-1 px-2 rounded-sm'>you</p>):null}
                        <p title={createdAt} className='text-gray-500'>{createdAt.includes('-') ? (timeAgo) : (createdAt)}</p>
                    </div>
                    
                    <div className="btns flex flex-row gap-4 pb-1 max-lg:hidden font-semibold">
                        {currentUser.username === user.username ? (
                            <>
                                <button onClick={()=>showPopup()} className='flex flex-row gap-4 items-center text-red-400 hover:opacity-40'><img src={IconDelete} alt="" /> Delete</button>
                                <button onClick={()=>showForm()} className='flex flex-row gap-4 items-center text-blue-700 hover:opacity-40'><img src={IconEdit} alt="" /> Edit</button>
                            </>
                        ): (
                            <button onClick={()=>showReply()} className='flex flex-row gap-4 items-center text-blue-700 hover:opacity-40'><img src={IconReply} alt="" /> Reply</button>
                        )}
                    </div>
                </div>
                <div className="comment-desc">
                    {edit === false ? (
                        <p className="">
                            {content}
                        </p>
                        ): (
                        <form onSubmit={handleSubmit} className="flex flex-col justify-end items-end gap-4">
                            <textarea name="comment" id="comment"
                             value={commentContent} 
                             onChange={e=>setCommentContent(e.target.value)} 
                             className="w-full border border-slate-200 p-4 rounded-lg"></textarea>
                            <button className="text-white bg-blue-800 font-bold px-4 py-2 rounded-lg uppercase hover:opacity-40">Update</button>
                        </form>
                    )}
                </div>
                 
                <div className="mobile-btns lg:hidden mt-3 flex flex-row justify-between items-center">
                    <div className='bg-slate-100 w-24 px-3 py-2 flex flex-row justify-between items-center text-blue-800 font-semibold rounded-xl'>
                        <button onClick={()=>dispatch(upVote({id}))}><img src={IconPlus} alt="upvote" /></button>
                        <p>{score}</p>
                        <button onClick={()=>dispatch(downVote({id}))}><img src={IconMinus} alt="downvote" /></button>
                    </div>
                    <div className='flex flex-row gap-4'>
                        {currentUser.username === user.username ? (
                            <>
                                <button onClick={()=>showPopup()} className='flex flex-row gap-4 font-semibold items-center text-red-400 hover:opacity-40'><img src={IconDelete} alt="" /> Delete</button>
                                <button onClick={()=>showReply()} className='flex flex-row gap-4 font-semibold items-center text-blue-700 hover:opacity-40'><img src={IconEdit} alt="" /> Edit</button>
                            </>
                        ): (
                            <button onClick={()=>showReply()} className='flex flex-row gap-4 items-center font-semibold text-blue-700 hover:opacity-40'><img src={IconReply} alt="" /> Reply</button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {replyComment ? (<ReplyForm key={id} showReply={showReply} replyingTo={user.username} id={id} currentUser={currentUser}/>) : null}
        
        {replies? (
            <Replies commentId={id} replies={replies}/>
        ):null}
    </>
  )
}

export default Comment