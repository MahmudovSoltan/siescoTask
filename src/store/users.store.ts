import { create } from 'zustand';
import type { UserData, UsersState } from '../types';



export const useUsersStore = create<UsersState>((set, get) => ({
  users: (() => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  })(),
  userListModal: false,
  addUser: (u) => {
    const newUser: UserData = { ...u, id: Date.now(), role: 'user' };
    const updatedUsers = [...get().users, newUser,];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    set({ users: updatedUsers });
  },
  openUserlistModal: () => {
    set({ userListModal: true })
  },
  closeUserlistModal: () => {
    set({ userListModal: false })
  }
}));
