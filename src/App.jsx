import { useState } from "react"
import Comments from "./component/Comments/Comments"
import { getUser } from "./app/userSlice"
import { useSelector } from "react-redux"


function App() {
  const currentUser = useSelector(getUser)
 
  return (
    <>
      <Comments />
    </>
  )
}

export default App
