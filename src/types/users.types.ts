export interface UserData {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: 'user';
}

export interface UsersState {
  users: UserData[] | [];
  addUser: (u: Omit<UserData, 'id'>) => void;
  userListModal:boolean,
  closeUserlistModal:()=>void,
  openUserlistModal:()=>void,

}