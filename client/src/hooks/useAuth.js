import { create } from "zustand";
import { auth } from "@/firebase/Firebase";

const useAuth = create((set) => ({
  loading: true,
  currentUser: null,
  token: localStorage.getItem("access_token") || null,
  setLoading: (loading) => set(() => ({ loading })),
  setCurrentUser: (currentUser) => set(() => ({ currentUser })),
  login: (token) => {
    localStorage.setItem("access_token", token);
    set(() => ({ token }));
  },
  logout: () => {
    auth.signOut();
    localStorage.removeItem("access_token");
    set(() => ({ token: null, currentUser: null }));
  },
}));

export default useAuth;
