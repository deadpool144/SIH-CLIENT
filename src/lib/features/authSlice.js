import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        users:{
            name: null,
            email: null,
        }
    },
    reducers: {
        setUserDetails: (state, action) => {
            state.isLoggedIn = true;
            state.users.name = action.payload.name;
            state.users.email = action.payload.email;

        },
        clearUserDetails: (state) => {
            state.isLoggedIn = false;
            state.users.name = null;
            state.users.email = null;

        },
        updateUserEmail: (state, action) => {
            state.users.email = action.payload.email;

        },
    },

})
export const { setUserDetails, clearUserDetails, updateUserEmail } = authSlice.actions;
export default authSlice.reducer;