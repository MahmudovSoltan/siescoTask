import React, { useState } from 'react';
import styles from './TaskModal.module.css';
import { useUsersStore } from '../../../store/users.store';
import type { TaskData, UserData } from '../../../types';
import ReusableModal from '../../../ui/reusbleModal';
import {
  isValidTitle,
  isValidDescription,
  isValidDeadline,
} from '../../../utils/validations';   // ✅ yeni import
import { toast } from 'react-toastify';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//   console.log(date, dateString);
// };

/* -- unchanged types & props ... -- */

interface Props {
  onClose?: () => void;
  onSave?: (task: TaskData) => void;
}

interface ErrState {
  title: boolean;
  description: boolean;
  deadline: boolean;
  users: boolean;
}

const TaskModal: React.FC<Props> = ({ onClose, onSave }) => {
  const { users } = useUsersStore();

  const [form, setForm] = useState<TaskData>({
    title: '',
    description: '',
    deadline: '',
    statusu: 'todo',
    users: [],
  });

  const [err, setErr] = useState<ErrState>({
    title: false,
    description: false,
    deadline: false,
    users: false,
  });

  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    if (!date) return;

    setForm(prev => ({
      ...prev,
      deadline: date.format('YYYY-MM-DD'),
    }));
  };
  console.log(form);

  /* ---------- Helpers ---------- */
  const validate = () => {
    const nextErr: ErrState = {
      title: !isValidTitle(form.title),
      description: !isValidDescription(form.description),
      deadline: !isValidDeadline(form.deadline),
      users: form.users.length === 0,
    };
    setErr(nextErr);
    return !Object.values(nextErr).includes(true);
  };

  const toggleUserSelection = (user: UserData) => {
    setForm(prev => {
      const exists = prev.users.some(u => u.id === user.id);
      const newUsers = exists
        ? prev.users.filter(u => u.id !== user.id)
        : [...prev.users, user];
      return { ...prev, users: newUsers };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave?.(form);
    onClose?.();
    toast.success("Successful Add")
  };

  /* ---------- Render ---------- */
  return (
    <ReusableModal title="Yeni Tapşırıq" onClose={onClose!} handleSave={handleSubmit}>
      <form className={styles.form}>

        <input
          className={err.title ? styles.error : ''}
          type="text"
          name="title"
          placeholder="Başlıq"
          value={form.title}
          onChange={handleChange}
        />
        {err.title && <p className={styles.errorText}>Başlıq 3–100 simvol olmalıdır.</p>}

        <textarea
          className={err.description ? styles.error : ''}
          name="description"
          placeholder="Təsviri yazın..."
          value={form.description}
          onChange={handleChange}
        />
        {err.description && (
          <p className={styles.errorText}>Təsvir ən azı 10 simvol olmalıdır.</p>
        )}
        <DatePicker onChange={handleDateChange} />
        {err.deadline && (
          <p className={styles.errorText}>Keçmiş tarix seçilə bilməz.</p>
        )}

        <div className={styles.usersSelection}>
          <p>İstifadəçiləri seçin:</p>

          <div className={styles.selectedUsers}>
            {form.users.map(user => (
              <button
                key={user.id}
                className={styles.selectedUserItem}
                onClick={() => toggleUserSelection(user)}
              >
                {user.name} {user.surname}
                <span className={styles.removeUser}>×</span>
              </button>
            ))}
          </div>

          <div className={styles.usersList}>
            {users.length === 0 ? (
              <p>İstifadəçi yoxdur</p>
            ) : (
              users.map(user => {
                const isSelected = form.users.some(sel => sel.id === user.id);
                return (
                  <div
                    key={user.id}
                    className={`${styles.userItem} ${isSelected ? styles.selected : ''}`}
                    onClick={() => toggleUserSelection(user)}
                  >
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{user.name} {user.surname}</span>
                      <span className={styles.userEmail}>{user.email}</span>
                    </div>
                    {isSelected && <span className={styles.checkmark}>✓</span>}
                  </div>
                );
              })
            )}
          </div>

          {err.users && (
            <p className={styles.errorText}>Ən azı bir istifadəçi seçilməlidir.</p>
          )}
        </div>

      </form>
    </ReusableModal>
  );
};

export default TaskModal;
