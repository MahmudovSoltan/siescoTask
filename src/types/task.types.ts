import type { UserData } from "./users.types";

type TaskStatus = 'todo' | 'inProgress' | 'done';
 export interface TaskData {
    id: number;
    title: string;
    tasks: string;
    statusu: TaskStatus;
    users: UserData[]

}

export interface TaskState {
    tasks: TaskData[] | [];
    addtasks: (u: Omit<TaskData, 'id'>) => void;
    taskModal: boolean;
    openTaskModal?: () => void;
    closeTaskModal?: () => void;
}