import { create } from 'zustand';
import type { TaskData, TaskState } from '../types';


export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: (() => {
        const stored = localStorage.getItem("tasks");
        return stored ? JSON.parse(stored) : [];
    })(),
    taskModal: false,
    addtasks: (u) => {
        const newtask: TaskData = { ...u, id: Date.now() };
        const updatedTask = [...get().tasks, newtask,];
        localStorage.setItem("tasks", JSON.stringify(updatedTask));
        set({ tasks: updatedTask });
    },
    openTaskModal: () => {
        set({ taskModal: true })
    },
    closeTaskModal: () => {
        set({ taskModal: false })
    }
}));
