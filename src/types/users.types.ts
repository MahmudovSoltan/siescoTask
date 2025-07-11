import type { TaskData } from "./task.types";

export interface UserData {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role?: 'user';
}

export interface UsersState {
  users: UserData[] | [];
  addUser: (u: Omit<UserData, 'id'>) => void;
  userListModal:boolean,
  closeUserlistModal:()=>void,
  openUserlistModal:()=>void,
  deleteUser:(userId:number|null)=>void,
  addUserToTask:(userId:number|null,selectedTasks: TaskData[])=>void

}