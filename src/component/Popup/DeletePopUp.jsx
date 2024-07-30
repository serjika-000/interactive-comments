import './style.css'
import { useDispatch } from 'react-redux'

const DeletePopUp = ({popUp,showPopup,deleteComment,id}) => {
  const dispatch = useDispatch()
  return (
    <div style={(popUp) ? {display: 'flex'} : {display: 'none'}} className='pop-up flex flex-row justify-center items-center'>
        <div className="w-80 p-4 delete-box bg-white rounded-lg flex flex-col justify-center items-start gap-4">
            <h3 className='text-gray-700 text-xl font-bold'>Delete comment</h3>
            <p className='text-gray-500'>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
            <div className='flex flex-row justify-center gap-4'>
                <button onClick={()=>showPopup()} className='px-4 py-2 text-white uppercase hover:opacity-40 font-bold rounded-lg bg-gray-600'>no, cancel</button>
                <button onClick={()=>{
                  dispatch(deleteComment({id}))
                  showPopup()
                  }} className='px-4 py-2 text-white uppercase hover:opacity-40 font-bold rounded-lg bg-red-500'>yes please</button>
            </div>
        </div>
    </div>
  )
}

export default DeletePopUp