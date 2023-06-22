import { create } from "zustand";

const useOpen = create((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open })),
}));

export default useOpen;
