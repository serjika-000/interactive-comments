import { useSelector } from "react-redux"
import { getComments } from "../../app/commentsSlice"
import Comment from "./Comment"
import { getUser } from '../../app/userSlice'
import NewComment from "../Form/NewComment"

const Comments = () => {
    const comments = useSelector(getComments)
    const currentUser = useSelector(getUser)
  return (
    <div className="comments max-w-3xl mx-auto flex flex-col gap-2 mt-4 mb-2">
        {comments?.length > 0 ? comments.map(comment=>(
            <Comment key={comment.id} commnet={comment} currentUser={currentUser}/>
        )):null}
        <NewComment currentUser={currentUser}/>
    </div>
  )
}

export default Comments