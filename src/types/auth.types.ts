
export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  organizationName: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (data: LoginData) => boolean;
  logout: () => void;
  registerAdmin: (admin: User) => boolean;
}