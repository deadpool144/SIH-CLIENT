// UserProvider.jsx
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserDetails, clearUserDetails } from "@/lib/features/userSlice";
import { useSelector } from "react-redux";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UserProvider({ children }) {
  const dispatch = useDispatch();



  const {users}= useSelector((state)=>state.auth)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/user/profile/me`, {
          withCredentials: true,
        });

        if (res.status === 200 && res.data?.data) {
          dispatch(
            setUserDetails({
              // name: res.data.data.user?.name,
              // email: res.data.data.user?.email,
              batch: res.data.data.profile?.batch,
              department: res.data.data.profile?.department,
              role: res.data.data.profile?.role,
              profileImage: res.data.data.profile?.profileImage,
              contact: res.data.data.contact,
              education: res.data.data.education,
              skills: res.data.data.skills,
              workExperience: res.data.data.workExperience,
              contribution: res.data.data.contribution,
              posts: res.data.data.posts || [],
            })
          );
        } else {
          dispatch(clearUserDetails());
        }
      } catch (error) {
        console.error("Fetching user profile failed:", error.response?.data || error.message);
        dispatch(clearUserDetails());
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  return children;
}
