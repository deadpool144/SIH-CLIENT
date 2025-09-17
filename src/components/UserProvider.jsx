"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserDetails, clearUserDetails } from "@/lib/features/userSlice";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UserFetcher() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // Only fetch profile if user is logged in
    if (!isLoggedIn) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/user/profile/me`, {
          withCredentials: true,
        });

        const data = res?.data?.data;

        if (res.status === 200 && data) {
          dispatch(
            setUserDetails({
              name: data.user ? `${data.user.firstName || ""} ${data.user.lastName || ""}`.trim() : null,
              email: data.user?.email || null,
              batch: data.profile?.batch || null,
              department: data.profile?.department || null,
              role: data.profile?.role || null,
              profileImage: data.profile?.profileImage || null,
              contact: data.contact || {},
              education: data.education || {},
              skills: data.skills || [],
              workExperience: data.workExperience || [],
              contribution: data.contribution || {},
              posts: data.posts || [],
            })
          );
        } else {
          dispatch(clearUserDetails());
        }
      } catch (error) {
        console.error("User fetch failed:", error.response?.data || error.message);
        dispatch(clearUserDetails());
      }
    };

    fetchUserProfile();
  }, [dispatch, isLoggedIn]);

  return null; // Doesn't render anything
}
