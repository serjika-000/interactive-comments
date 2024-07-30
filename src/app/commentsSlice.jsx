import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments:[
        {
            id: 1,
            content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            createdAt: "1 month ago",
            score: 12,
            user: {
                image: { 
                png: "./avatars/image-amyrobson.png",
                webp: "./avatars/image-amyrobson.webp"
                },
                username: "amyrobson"
            },
            replies: []
        },
        {
            id: 2,
            content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            createdAt: "2 weeks ago",
            score: 5,
            user: {
              image: { 
                png: "./avatars/image-maxblagun.png",
                webp: "./avatars/image-maxblagun.webp"
              },
              username: "maxblagun"
            },
            replies: [
              {
                id: 3,
                content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                createdAt: "1 week ago",
                score: 4,
                replyingTo: "maxblagun",
                user: {
                  image: { 
                    png: "./avatars/image-ramsesmiron.png",
                    webp: "./avatars/image-ramsesmiron.webp"
                  },
                  username: "ramsesmiron"
                }
              },
              {
                id: 4,
                content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                createdAt: "2 days ago",
                score: 2,
                replyingTo: "ramsesmiron",
                user: {
                  image: { 
                    png: "./avatars/image-juliusomo.png",
                    webp: "./avatars/image-juliusomo.webp"
                  },
                  username: "juliusomo"
                }
              }
            ]
        }
    ]
}

const commentsSlice = createSlice({
    name:"comments",
    initialState,
    reducers:{
        createComment: (state,action)=>{
            const {user,content} = action.payload
            state.comments.push(
                {
                    id:state.comments.length+1,
                    content,
                    createdAt: new Date().toISOString(),
                    score:0,
                    user:{
                        image:{
                            png:user.image.png
                        },
                        username:user.username
                    }
                }
            )
        },
        addReply: (state,action)=>{
          const {user,content,replyingTo,id} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === id)
          if(commentExist){
            commentExist.replies.push({
              id:commentExist.replies.length+1,
              content,
              createdAt: new Date().toISOString(),
              score:0,
              replyingTo,
              user
            })
          }
        },
        upVote: (state,action)=>{
          const {id} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === id)
          if(commentExist){
            commentExist.score += 1
          }
        },
        downVote: (state,action)=>{
          const {id} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === id)
          if(commentExist){
            if(commentExist.score === 0){
              return
            }else{
              commentExist.score -= 1
            }
          }
        },
        deleteComment: (state,action)=>{
          const {id} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === id)
          if(commentExist){
            state.comments.splice(state.comments.indexOf(commentExist),1)
          }
        },
        upVoteReply: (state,action)=>{
          const {id,commentId} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === commentId)
          if(commentExist){
            const replyExist = commentExist.replies.find(reply=>reply.id === id)
            if(replyExist){
              replyExist.score += 1
            }
          }
        },
        downVoteReply: (state,action)=>{
          const {id,commentId} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === commentId)
          if(commentExist){
            const replyExist = commentExist.replies.find(cmt=>cmt.id === id)
            if(replyExist){
              if(replyExist.score === 0){
                return
              }else {
                replyExist.score -= 1
              }
            }
          }
        },
        deleteReply: (state,action)=>{
          const {commentId,id} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === commentId)
          if(commentExist){
            const replyExist = commentExist.replies.find(reply=>reply.id === id)
            if(replyExist){
              commentExist.replies.splice(commentExist.replies.indexOf(replyExist),1)
            }
          }
        },
        upDateComment: (state,action)=>{
          const {id,content} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === id)
          if(commentExist){
            commentExist.content = content
          }
        },
        upDateReply: (state,action)=>{
          const {commentId,id,content} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === commentId)
          if(commentExist){
            const replyExist = commentExist.replies.find(reply=>reply.id === id)
            if(replyExist){
              replyExist.content = content
            }
          }
        },
        replyReply: (state,action)=>{
          const {id,commentId,user,content,replyingTo} = action.payload
          const commentExist = state.comments.find(comment=>comment.id === commentId)
          if(commentExist){
            commentExist.replies.push({
              id:commentExist.replies.length+1,
              replyingTo,
              content,
              user,
              score:0,
              createdAt: '1 second ago'
            })
          }
        }
    }
})

export const getComments= (state)=> state.comments.comments;
export const { createComment,deleteComment,upVote,
    downVote,addReply,upVoteReply,upDateReply,replyReply,
    downVoteReply,deleteReply, upDateComment } = commentsSlice.actions
export default commentsSlice.reducer
