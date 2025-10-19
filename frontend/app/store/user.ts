import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserStore = {
  accessToken: string | null;
  user: { name: string; email: string; _id: string; role: string } | null;
  setAccessToken: (accessToken: UserStore['accessToken']) => void;
  setUser: (user: UserStore['user']) => void;
  setLogout: () => void;
};

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        user: null,
        setUser: (user) => set((state) => ({ user })),
        setAccessToken: (accessToken) => set((state) => ({ accessToken })),
        setLogout: () => set((state) => ({ user: null, accessToken: null })),
      }),
      {
        name: 'user',
        partialize: (state) => ({
          user: state.user,
        }),
      }
    )
  )
);

export default useUserStore;
