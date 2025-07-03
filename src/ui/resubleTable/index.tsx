import { useState } from 'react';
import styles from './css/mixedTable.module.css';

export default function ReusbleTable({ data, onActions, type }) {
  const [menuRowId, setMenuRowId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);



  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const toggleMenu = (id) => {
    setMenuRowId((prev) => (prev === id ? null : id));
  };
  console.log(data);

  const renderColumns = (row) => {
    if (type === 'user') {
      return (
        <>
          <td>{row.name}</td>
          <td>{row.surname}</td>
          <td>{row.email}</td>
          <td>{row.password}</td>
        </>
      );
    } else if (type === 'tasks') {
      return (
        <>
          <td>{row.title}</td>
          <td>{row.description}</td>
          <td>{new Date(row.deadline).toLocaleDateString()}</td>
          <td>
            <div className={styles.dropdown_container}>
              <button
                onClick={() => toggleDropdown(row.id)}
                  className={styles.dropdown_btn}
              >
                users
              </button>

              {openDropdownId === row.id && ( // Sadece ilgili satırın dropdown'u açık
                <ul
                  className={styles.user_dropdown}
                  onMouseLeave={() => setOpenDropdownId(null)} // Mouse ayrılınca kapat
                >
                  {row.users?.map((option, index) => (
                    <li
                      key={index}
                      className={styles.dropdown_options}
                    >
                      {option.name}
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
    if (type === "user") {
      return (
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      );
    } else if (type === "tasks") {
      return (
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Deadline</th>
          <th>Users</th>
          <th>Actions</th>
        </tr>
      );
    } else {
      return null;
    }
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
                <button className={styles.actionButton} onClick={() => toggleMenu(row.id)}>⋯</button>
                {menuRowId === row.id && (
                  <ul className={styles.dropdown} onMouseLeave={() => setMenuRowId(null)}>
                    {type === 'tasks' && (
                      <>
                        <li><button onClick={() => onActions.assign(row)}>Assign</button></li>
                        <li><button onClick={() => onActions.changeStatus(row, 'inProgress')}>To In Progress</button></li>
                        <li><button onClick={() => onActions.changeStatus(row, 'done')}>To Done</button></li>
                      </>
                    )}
                    {type === 'user' && (
                      <>
                        <li><button onClick={() => onActions.resetPassword(row)}>Reset Password</button></li>
                        <li><button onClick={() => onActions.deleteUser(row)}>Delete User</button></li>
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