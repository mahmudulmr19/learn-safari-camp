import { create } from "zustand";

const useMode = create((set) => ({
  mode: localStorage.getItem("mode") || "light",
  setMode: () => {
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);
      return { mode: newMode };
    });
  },
}));

export default useMode;
