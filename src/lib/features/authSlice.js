import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        user:{
            name: null,
            email: null,
        }
    },
    reducers: {
        setUserDetails: (state, action) => {
            state.isLoggedIn = true;
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;

        },
        clearUserDetails: (state) => {
            state.isLoggedIn = false;
            state.user.name = null;
            state.user.email = null;

        },
        updateUserEmail: (state, action) => {
            state.user.email = action.payload.email;

        },
    },

})
export const { setUserDetails, clearUserDetails, updateUserEmail } = authSlice.actions;
export default authSlice.reducer;