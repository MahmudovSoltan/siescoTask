import type { UserData } from "./users.types";

type TaskStatus = 'todo' | 'inProgress' | 'done';
export interface TaskData {
    id: number;
    title: string;
    tasks: string;
    statusu: TaskStatus;
    users: UserData[]

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
    openAssignModal:(taskId:number)=>void,
    closeAssignModal:()=>void,
    addAsignUser:(assignTaskid:number|null,selectUsers:UserData[])=>void,
    deleteTask:(taskId:number)=>void
}