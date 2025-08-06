import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from '../storeManagment/index'
import {UserData} from '@constants/api/user/index'
interface UserProfileStore {
  userProfile: Partial<UserData> | null;
  setUserProfile: (userProfile: Partial<UserData>) => void;
  clearUserProfile: () => void;
  isAuthenticated: (userProfile: Partial<UserData> | null) => boolean;
}

const useUserProfileStore = create<UserProfileStore>()(
  persist(
    (set) => ({
      userProfile: null,
      setUserProfile: (userProfile) => set({ userProfile }),
      clearUserProfile: () => {
        set({ userProfile: null });
      },
      isAuthenticated: (userProfile: Partial<UserData> | null) => {
        if ( !userProfile?.name) {
          return false;
        }
        return true;
      },
    }),
    {
      name: "DEKAMOND-STORAGE",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserProfileStore
