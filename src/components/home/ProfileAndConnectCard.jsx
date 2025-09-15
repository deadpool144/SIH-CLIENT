"use client";

import { useSelector } from "react-redux";
import ProfileCard from "./profileAndConnect/ProfileCard";
import ConnectCard from "./profileAndConnect/ConnectCard";

export default function ProfileAndConnectCard({ handleMessage }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      {isLoggedIn ? (
        <ProfileCard handleMessage={handleMessage} />
      ) : (
        <ConnectCard />
      )}
    </>
  );
}
