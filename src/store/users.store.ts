import { create } from 'zustand';
import type { TaskData, UserData, UsersState } from '../types';
import { useTaskStore } from './task.store';



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
  },
  deleteUser: (userId: number | null) => {
    const users = get().users
    const newUsers = [...users]
    const filterUserlist = newUsers.filter((newUser) => newUser.id !== userId)
    localStorage.setItem("users", JSON.stringify(filterUserlist));
    set({ users: filterUserlist })
  },
  addUserToTask: (userId: number | null, selectedTasks: TaskData[]) => {
    const users = get().users
    const newUsers = [...users]
    const findUser = newUsers.find((newUser) => newUser.id === userId)

    const { tasks, setTasks } = useTaskStore.getState();
    const updatedTasks = tasks.map((task: TaskData) =>
      selectedTasks.some((t) => t.id === task.id)
        ? {
          ...task,
          users: [...task.users, findUser].filter((u): u is UserData => u !== undefined) // yalnız UserData əlavə et
        }
        : task
    );
    setTasks(updatedTasks)
  }

}));
