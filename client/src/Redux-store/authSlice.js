import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload.isAuth
            state.user = action.payload.user
        }
    }
})

export const { setIsAuth } = authSlice.actions

export default authSlice.reducer