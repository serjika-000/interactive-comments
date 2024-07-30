import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:{
        image:{
            png: "./avatars/image-juliusomo.png"
        },
        username:"juliusomo"
    }
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        
    }
})

export const getUser = (state)=> state.user.currentUser
export default userSlice.reducer
