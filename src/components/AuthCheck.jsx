"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserDetails, clearUserDetails } from "@/lib/features/authSlice";

const baseURL = "http://localhost:5000";

function AuthCheck() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/auth/check-auth`, {
          withCredentials: true,
        });

        if (res.status === 200 && res.data?.data?.user) {
          const { firstName, lastName, email } = res.data.data.user;
          dispatch(
            setUserDetails({
              name: `${firstName} ${lastName}`,
              email,
            })
          );
        } else {
          dispatch(clearUserDetails());
        }
      } catch (error) {
        console.error("Auth check failed:", error.response?.data || error.message);
        dispatch(clearUserDetails());
      }
    };

    checkAuth();
  }, [dispatch]);

  return null;
}

export default AuthCheck;
