import { create } from 'zustand';
import type { TaskData, TaskState, TaskStatus, UserData } from '../types';


export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: (() => {
        const stored = localStorage.getItem("tasks");
        return stored ? JSON.parse(stored) : [];
    })(),
    taskModal: false,
    assignUserModal: {
        open: false,
        taskId: null,
    },
    setTasks: (tasks: TaskData[]) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        set({ tasks });
    },
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
    },
    removeAsignUser: (userId: number, taskId: number) => {
        const { tasks } = get();
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    users: task.users?.filter(u => u.id !== userId)
                };
            }
            return task;
        });

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        set({ tasks: updatedTasks });
    },
    addAsignUser: (assignTaskid: number | null, selectUsers: UserData[]) => {
        const newtasks = [...get().tasks];
        const findTask = newtasks.find((newTask) => newTask.id === assignTaskid);

        if (findTask) {
            findTask.users = [...findTask.users, ...selectUsers];
            localStorage.setItem("tasks", JSON.stringify(newtasks));
            set({ tasks: newtasks });
        }
    },
    openAssignModal: (taskId: number) => {
        set({
            assignUserModal: {
                open: true,
                taskId
            }
        })
    },
    closeAssignModal: () => {
        set({
            assignUserModal: {
                open: false,
                taskId: null
            }
        })
    },
    deleteTask: (taskId: number) => {
        const tasks = get().tasks;
        const newTasks = [...tasks];
        const filetrTask = newTasks.filter((newTask) => newTask.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(filetrTask));
        set({ tasks: filetrTask });
    }
    ,
    updateTaskStatus: (taskId: number, newStatus: TaskStatus) => {

        const { tasks } = get();
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, statusu: newStatus } : task
        );
        console.log(updatedTasks);

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        set({ tasks: updatedTasks });
    }

}));
