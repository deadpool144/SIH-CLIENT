// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {  // changed 'users' -> 'user'
    name: null,
    email: null,
    batch: null,
    department: null,
    role: null,
    profileImage: null,
    contact: {
      phone: null,
      linkedin: null,
      location: null,
    },
    education: {
      tenth: null,
      twelfth: null,
      cgpa: null,
    },
    skills: [],
    workExperience: [],
    contribution: {
      mentorship: false,
      donation: false,
      lastDonation: null,
      totalDonations: 0,
      eventsAttended: 0,
      leaderRank: 0,
    },
    posts: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.isLoggedIn = true;
      state.user = { ...state.user, ...action.payload };
    },
    clearUserDetails: (state) => {
      state.isLoggedIn = false;
      state.user = { ...initialState.user };
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUserDetails, clearUserDetails, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
