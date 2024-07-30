import { createContext, useState } from "react"

export const PopProvider = createContext()
const PopContext = (props) => {
    const [popUp,setPopup] = useState(false)
    const showPopup = ()=>{
        !popUp ? setPopup(true) : setPopup(false)
    }
  return (
    <PopProvider.Provider value={{popUp,setPopup,showPopup}}>
        {props.children}
    </PopProvider.Provider>
)
}

export default PopContext