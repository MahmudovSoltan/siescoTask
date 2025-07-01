import { create } from 'zustand';

interface User {
    name: string;
    surname: string;
    email: string;
    password: string;
}
interface UserData {
    email: string, password: string
}
interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    login: (data:UserData) => boolean;
    register: (user: User) => boolean;
    logout: () => void;
}

const LOCAL_STORAGE_KEY = 'myAppUser';

export const useAuthStore = create<AuthState>((set) => ({
    user: (() => {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) as User : null;
    })(),
    isLoggedIn: false,

    register: (user) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
        set({ user, isLoggedIn: true });
        return true;
    },

    login: (data) => {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!storedUser) return false;

        const user: User = JSON.parse(storedUser);
        if (user.email === data.email && user.password === data.password) {
            set({ user, isLoggedIn: true });
            return true;
        }

        return false;
    },

    logout: () => {
        set({ user: null, isLoggedIn: false });
    },
}));
