import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStore = {
  accessToken: string | null;
  user: { name: string; email: string; _id: string; role: string } | null;
  setAccessToken: (accessToken: UserStore['accessToken']) => void;
  setUser: (user: UserStore['user']) => void;
  setLogout: () => void;
};

const useUserStore = create<UserStore>()(
  devtools((set) => ({
    accessToken: null,
    user: null,
    setUser: (user) => set((state) => ({ user })),
    setAccessToken: (accessToken) => set((state) => ({ accessToken })),
    setLogout: () => set((state) => ({ user: null, accessToken: null })),
  }))
);

export default useUserStore;
