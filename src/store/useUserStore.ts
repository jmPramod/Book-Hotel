import type { User } from "../types/User";
import { loginApi, registerApi, updateProfile } from "../utils/Api.services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  address?: string;
  state?: string;
  country?: string;
  pinCode?: number;
}

interface UpdatePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  state?: string;
  country?: string;
  pinCode?: number;
  avatar?: string;
}

interface UserState {
  user: User | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;

  darkMode: boolean;
  toggleDarkMode: () => void;

  login: (body: LoginPayload) => Promise<any>;
  register: (body: RegisterPayload) => Promise<any>;
  updateUser: (payload: UpdatePayload | FormData, id: string) => Promise<any>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      setLoading: (loading) => set({ loading }),
      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      login: async (body) => {
        try {
          set({ loading: true });

          const res = await loginApi(body);

          if (res.status === 200 || res.status === 200) {
            set({ user: res.data as User });
          }

          return res;
        } finally {
          set({ loading: false });
        }
      },
      register: async (body) => {
        try {
          set({ loading: true });

          const res = await registerApi(body);

          if (res.status === 200 || res.status === 200) {
            set({ user: res.data as User });
          }

          return res;
        } finally {
          set({ loading: false });
        }
      },
      updateUser: async (payload: UpdatePayload | FormData, id: string) => {
        try {
          set({ loading: true });

          const res = await updateProfile(payload, id);

          if (res.status === 200 || res.status === 200) {
            const currentUser = get().user;
            const updatedUser = { ...currentUser, ...res.data };

            set({ user: updatedUser as User });
          }

          return res;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
    }
  )
);
