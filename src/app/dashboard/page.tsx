"use client";
import useStore from "@/store/storeManagment/useStore";
import useUserProfileStore from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const userProfile = useStore(
      useUserProfileStore,
      (state) => state.userProfile
    );
    const IsAuthenticated = useStore(
      useUserProfileStore,
      (state) => state.isAuthenticated(state.userProfile)
    );
    const router= useRouter()
  useEffect(() => {
    
    if (!IsAuthenticated && IsAuthenticated!==undefined) {
      router.push("/auth");
    }
  }, [IsAuthenticated]);
  return (
    <div>
      Hello{" "}
      {userProfile?.name?.title + " "} 
        {userProfile?.name?.first + " "}
       { userProfile?.name?.last+ " "}
    </div>
  );
}
