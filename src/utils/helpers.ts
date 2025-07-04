import type { UserData, TaskData } from "../types";

export const isUserAssignedToTask = (tasks: TaskData[]) =>
  (user: UserData, taskId: number | null): boolean => {
    return tasks.find((t) => t.id === taskId)?.users.some((u) => u.id === user.id) ?? false;
  };

export const getUserId = (user: UserData) => user.id;

export const getUserName = (user: UserData) => user.name;
export const getUserEmail = (user: UserData) => user.email;

export const isTaskAssignedToUser = (user: UserData | undefined) =>
  (task: TaskData, userId: number | null): boolean => {
    return task.users.some((u) => u.id === userId);
  };


export const getTaskId = (task: TaskData) => task.id;

export const getTaskTitle = (task: TaskData) => task.title;

export const getTaskStatus = (task: TaskData) => task.statusu;
