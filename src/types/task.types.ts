import type { UserData } from "./users.types";

 export type TaskStatus = 'todo' | 'inProgress' | 'done'|"In_review";
export interface TaskData {
    id?: number | null;
    title: string;
    tasks?: string;
    statusu: TaskStatus | null;
    users: UserData[],
    description: string;
    deadline: string,
    status?:TaskStatus | null

}
type assignUserModalType = {
    open: boolean;
    taskId: number | null;
}

export interface TaskState {
    tasks: TaskData[] | [];
    addtasks: (u: Omit<TaskData, 'id'>) => void;
    taskModal: boolean;
    assignUserModal: assignUserModalType;
    openTaskModal?: () => void;
    closeTaskModal?: () => void;
    removeAsignUser: (userId: number, taskId: number) => void,
    openAssignModal: (taskId: number) => void,
    closeAssignModal: () => void,
    addAsignUser: (assignTaskid: number | null, selectUsers: UserData[]) => void,
    deleteTask: (taskId: number) => void,
    setTasks: (tasks: TaskData[]) => void,
    updateTaskStatus: (taskId: number, newStatus: TaskStatus) => void
}