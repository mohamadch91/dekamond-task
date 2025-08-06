import useStore from "@/store/storeManagment/useStore";
import useUserProfileStore from "@/store/user";
import Image from "next/image";

export default function Dashboard() {
    const userProfile = useStore(
      useUserProfileStore,
      (state) => state.userProfile
    );
  return (
    <div>
      Hello{" "}
      {userProfile?.name?.title }
        {userProfile?.name?.first }
       { userProfile?.name?.last}
    </div>
  );
}
