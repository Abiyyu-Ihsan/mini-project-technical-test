import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  burger: boolean;
  toggleClicked: () => void;
};

export const useBurgerStore = create<State>((set) => ({
  burger: false,
  toggleClicked: () => set((state) => ({ burger: !state.burger })),
}));
