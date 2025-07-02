// store/authStore.ts
import { create } from 'zustand';
import type { AuthState, User } from '../types';


const LOCAL_STORAGE_KEY = 'myAppAdmin';
const LOGGED_IN_USER_KEY = 'loggedInUser';

const defaultAdmin: User = {
  name: 'Elvin',
  surname: 'Memmedov',
  email: 'admin@example.com',
  password: '123456',
  organizationName: 'MyCompany',
  phone: '0501234567',
  address: 'Baku, Azerbaijan',
  role: 'admin',
};

export const useAuthStore = create<AuthState>((set) => {
  // Əgər localStorage-da admin yoxdursa, default admin yaz
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultAdmin));
  }

  const storedUser = localStorage.getItem(LOGGED_IN_USER_KEY);

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    isLoggedIn: !!storedUser,

    registerAdmin: (admin) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(admin));
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(admin));
      set({ user: admin, isLoggedIn: true });
      return true;
    },

    login: (data) => {
      const adminStr = localStorage.getItem(LOCAL_STORAGE_KEY);
      const usersStr = localStorage.getItem("users");

      let foundUser: User | null = null;

      // Admin yoxlaması
      if (adminStr) {
        const admin: User = JSON.parse(adminStr);
        const isAdminMatch = admin.email === data.email && admin.password === data.password;

        if (isAdminMatch) {
          foundUser = admin;
        }
      }

      // Əgər admin tapılmadısa, user-lərdən yoxla
      if (!foundUser && usersStr) {
        const users: User[] = JSON.parse(usersStr);

        const matchedUser = users.find(
          (u) => u.email === data.email && u.password === data.password
        );

        if (matchedUser) {
          foundUser = matchedUser;
        }
      }

      // Əgər hər hansı user tapılıbsa — login et
      if (foundUser) {
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(foundUser));
        set({ user: foundUser, isLoggedIn: true });
        return true;
      }

      return false;
    },


    logout: () => {
      localStorage.removeItem(LOGGED_IN_USER_KEY);
      set({ user: null, isLoggedIn: false });
    },
  };
});
