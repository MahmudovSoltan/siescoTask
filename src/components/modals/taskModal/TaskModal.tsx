import React, { useState } from 'react';
import styles from './TaskModal.module.css';
import { useUsersStore } from '../../../store/users.store';
import type { UserData } from '../../../types';

interface Props {
  onClose?: () => void;
  onSave?: (task: Omit<TaskData, "id">) => void;
}

export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface TaskData {
  title: string;
  description: string;
  deadline: string;
  status: TaskStatus;
  users: UserData[];
}

const TaskModal: React.FC<Props> = ({ onClose, onSave }) => {
  const { users } = useUsersStore();

  const [form, setForm] = useState<TaskData>({
    title: '',
    description: '',
    deadline: '',
    status: 'todo',
    users: []
  });

  const toggleUserSelection = (user: UserData) => {
    setForm((prev) => {
      const isSelected = prev.users.some(u => u.id === user.id);
      let newUsers;
      if (isSelected) {
        // Seçiləni çıxar
        newUsers = prev.users.filter(u => u.id !== user.id);
      } else {
        // Seçimə əlavə et
        newUsers = [...prev.users, user];
      }
      return {
        ...prev,
        users: newUsers,
      };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(form);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Yeni Tapşırıq</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Başlıq"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Təsviri yazın..."
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
          />

          <select name="status" disabled value={form.status} onChange={handleChange}>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className={styles.usersSelection}>
            <p>İstifadəçiləri seçin:</p>
            <div className={styles.usersList}>
              {users.map(user => {
                const isSelected = form.users.some(u => u.id === user.id);
                return (
                  <div
                    key={user.id}
                    className={`${styles.userItem} ${isSelected ? styles.selected : ''}`}
                    onClick={() => toggleUserSelection(user)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') toggleUserSelection(user);
                    }}
                  >
                    {user.name} {user.surname}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit">Yadda saxla</button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Bağla</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
