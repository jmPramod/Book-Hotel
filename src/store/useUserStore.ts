import type { User } from "../types/User";
import { loginApi, registerApi } from "../utils/Api.services";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { User } from "../types/User";

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

interface UserState {
  user: User | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  logout: () => void;
   darkMode: boolean;
   
  toggleDarkMode: () => void;

  login: (body: LoginPayload) => Promise<any>;
  register: (body: RegisterPayload) => Promise<any>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
  darkMode: true,
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),
      setDarkMode: (value: boolean) =>
        set({ darkMode: value }),

      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),

      // ----------------------
      // LOGIN
      // ----------------------
      login: async (body) => {
        try {
          set({ loading: true });

          const res = await loginApi(body)
 
          console.log("res.data.data ",res );
         if (res.status === 201 || res.status === 200) {
        
            set({ user: res.data.data as User });
          }

          return res;
        } finally {
          set({ loading: false });
        }
      },

      // ----------------------
      // REGISTER (save to local storage)
      // ----------------------
      register: async (body) => {
        try {
          set({ loading: true });

          const result = await  registerApi(body)

      
        if (result.status === 201 || result.status === 200) {
          // Save user in Zustand + localStorage
            set({ user: result.data as User });
          }

          return result;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store", // localStorage key
    }
  )
);
