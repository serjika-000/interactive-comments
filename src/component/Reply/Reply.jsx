import { useState } from 'react'
import IconPlus from '../../assets/images/icon-plus.svg'
import IconMinus from '../../assets/images/icon-minus.svg'
import IconReply from '../../assets/images/icon-reply.svg'
import IconEdit from '../../assets/images/icon-edit.svg'
import IconDelete from '../../assets/images/icon-delete.svg'
import { useDispatch } from 'react-redux'
import { upVoteReply, downVoteReply, deleteReply,upDateReply } from '../../app/commentsSlice'
import ReplyComment from './ReplyComment'
import DeleteReply from '../Popup/DeleteReply'
import { useContext } from 'react'
import { PopProvider } from '../../context/PopContext'
import {formatDistanceToNowStrict} from 'date-fns'

const Reply = ({reply,currentUser,commentId}) => {
    const {popUp,showPopup} = useContext(PopProvider)
    const {id,content,createdAt,score,replyingTo,user} = reply
    const dispatch = useDispatch()

    let timeAgo = ''
    if(createdAt.includes('-')){
        timeAgo = `${formatDistanceToNowStrict(createdAt)} ago`
    }

    const [commentContent,setCommentContent] = useState(content)
    const [edit,setEdit] = useState(false)
    const [replyComment,setReplyComment] = useState(false)

    const showForm = ()=>{
        edit === false ? setEdit(true) : setEdit(false)
    }

    const showReply =()=>{
        replyComment === false ? setReplyComment(true) : setReplyComment(false)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(upDateReply({id,commentId,content:commentContent}))
        showForm()
      }
  return (
    <>
        <DeleteReply popUp={popUp} showPopup={showPopup} deleteReply={deleteReply} ids={{commentId,id}}/>
        <div key={id} className='reply max-w-xl bg-white p-4 self-end rounded-lg w-full'>
            <div className="score-btns font-semibold text-blue-900 rounded-xl flex flex-col justify-between items-center py-3 max-lg:hidden">
                <button onClick={()=>dispatch(upVoteReply({id,commentId}))}><img src={IconPlus} alt="upvote icon" className='vote hover:text-blue-700'/></button>
                <p className='score'>{score}</p>
                <button onClick={()=>dispatch(downVoteReply({id,commentId}))}><img src={IconMinus} alt="downvote icon" className='vote hover:text-blue-700'/></button>
            </div>

            <div className="reply-content">
                <div className="user-info flex flex-row justify-between p-2">
                    <div className="user-detail flex flex-row items-center gap-4 font-semibold">
                        <img src={user.image.png} alt="" className='w-8 h-8'/>
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
                            <button onClick={()=>showReply()} className='flex flex-row font-semibold gap-4 items-center text-blue-700 hover:opacity-40'><img src={IconReply} alt="" /> Reply</button>
                        )}
                    </div>
                </div>
                <div className="reply-desc">
                    {edit === false ? (
                        <p className=''>
                            <span className='text-blue-700 font-semibold'>@{replyingTo}</span> {content}
                        </p>
                    ):(
                        <form onSubmit={handleSubmit} className='flex flex-col justify-end items-end gap-4'>
                            <textarea name="reply" id="reply"
                            value={commentContent} 
                            onChange={e=>setCommentContent(e.target.value)}
                            className="w-full border border-slate-200 pl-4 rounded-lg">

                            </textarea>
                            <button className="text-white bg-blue-800 font-bold px-4 py-2 rounded-lg uppercase hover:opacity-40">update</button>
                        </form>
                    )}
                </div>
                   
                <div className="mobile-btns lg:hidden mt-3 flex flex-row justify-between items-center">
                    <div className='bg-slate-100 w-24 px-3 py-2 flex flex-row justify-between items-center text-blue-800 font-semibold rounded-xl'>
                        <button onClick={()=>dispatch(upVoteReply({id,commentId}))}><img src={IconPlus} alt="upvote" /></button>
                        <p>{score}</p>
                        <button onClick={()=>dispatch(downVoteReply({id,commentId}))}><img src={IconMinus} alt="downvote" /></button>
                    </div>
                    <div className='flex flex-row gap-4'>
                        {currentUser.username === user.username ? (
                            <>
                                <button onClick={()=>showPopup()} className='flex flex-row font-semibold gap-4 items-center text-red-400 hover:opacity-40'><img src={IconDelete} alt="" /> Delete</button>
                                <button onClick={()=>showForm()} className='flex flex-row font-semibold gap-4 items-center text-blue-700 hover:opacity-40'><img src={IconEdit} alt="" /> Edit</button>
                            </>
                        ): (
                            <button onClick={()=>showReply()} className='flex flex-row font-semibold gap-4 items-center text-blue-700 hover:opacity-40'><img src={IconReply} alt="" /> Reply</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {replyComment ? (<ReplyComment key={id} showReply={showReply} replyingTo={user.username} commentId={commentId} currentUser={currentUser}/>) : null}
    </>
  )
}

export default Reply