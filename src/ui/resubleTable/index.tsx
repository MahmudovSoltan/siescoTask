import { useState } from 'react';
import styles from './css/mixedTable.module.css';
import { FaChevronDown } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import type { TaskData, UserData } from '../../types';

interface ActionsType {
  assign: (task: TaskData | UserData) => void;
  changeStatus: (task: TaskData, newStatus: string) => void;
  deleteUser: (userId: number, taskId?: number) => void; // taskId optional for user list
  deleteTask: (id: number) => void;
}

interface PropsType {
  data: TaskData[] | UserData[];
  onActions: ActionsType;
  type: 'user' | 'tasks';
}

export default function ReusbleTable({ data, onActions, type }: PropsType) {
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number | null) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const toggleMenu = (id: number | null) => {
    setMenuRowId((prev) => (prev === id ? null : id));
  };

  const renderColumns = (row: TaskData | UserData) => {
    if (type === 'user') {
      const user = row as UserData;
      return (
        <>
          <td>{user.name}</td>
          <td>{user.surname}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
        </>
      );
    } else if (type === 'tasks') {
      const task = row as TaskData;
      return (
        <>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{new Date(task.deadline).toLocaleDateString()}</td>
          <td>{task.statusu}</td>
          <td>
            <div className={styles.dropdown_container}>
              <button
                onClick={() => toggleDropdown(typeof task.id === 'number' ? task.id : null)}
                className={styles.dropdown_btn}
              >
                users <FaChevronDown
                  size={10}
                  style={{
                    transition: 'transform 0.3s ease',
                    transform: openDropdownId === task.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {openDropdownId === task.id && (
                <ul
                  className={styles.user_dropdown}
                  onMouseLeave={() => setOpenDropdownId(null)}
                >
                  {task.users?.map((user, index) => (
                    <li
                      key={index}
                      className={styles.dropdown_options}
                    >
                      {user.name}
                      <button
                        onClick={() => {
                          if (typeof user.id === 'number' && typeof task.id === 'number') {
                            onActions.deleteUser(user.id, task.id);
                          }
                        }}
                      >
                        <MdDelete />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </td>
        </>
      );
    }
  };

  const renderHeaders = () => {
    if (type === 'user') {
      return (
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      );
    } else if (type === 'tasks') {
      return (
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Deadline</th>
          <th>Status</th>
          <th>Users</th>
          <th>Actions</th>
        </tr>
      );
    }
    return null;
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>{renderHeaders()}</thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {renderColumns(row)}
              <td className={styles.actionsCell}>
                <button className={styles.actionButton} onClick={() => toggleMenu(typeof row.id === 'number' ? row.id : null)}>⋯</button>
                {menuRowId === row.id && (
                  <ul className={styles.dropdown} onMouseLeave={() => setMenuRowId(null)}>
                    {type === 'tasks' && (
                      <>
                        <li><button onClick={() => onActions.assign(row)}>Assign</button></li>
                        <li><button onClick={() => { const id = (row as TaskData).id; if (typeof id === 'number') onActions.deleteTask(id); }}>Delete <MdDelete /></button></li>
                      </>
                    )}
                    {type === 'user' && (
                      <>
                        <li><button onClick={() => onActions.assign(row)}>Assign</button></li>
                        <li><button onClick={() => onActions.deleteUser((row as UserData).id)}>Delete User <MdDelete /></button></li>
                      </>
                    )}
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
