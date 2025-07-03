import { useState } from "react";
import { useUsersStore } from "../../../store/users.store";
import type { UserData } from "../../../types";
import styles from "./css/assignUserModal.module.css";
import { useTaskStore } from "../../../store/task.store";
import { useShallow } from "zustand/shallow";

const AssignUserModal = ({title,onclose,datas,items,onSave}) => {
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { users } = useUsersStore();
  const {  closeAssignModal, assignTaskid, tasks } =
    useTaskStore(
      useShallow((state) => ({
        closeAssignModal: state.closeAssignModal,
        assignTaskid: state.assignUserModal.taskId,
        tasks: state.tasks,
      }))
    );

  const task = tasks.find((t) => t.id === assignTaskid);
  const assignedUserIds = task?.users.map((u) => u.id) || [];

  const toggleUserSelection = (user: UserData) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const isSelected = (userId: number) =>
    selectedUsers.some((u) => u.id === userId);

  const filteredUsers = users.filter((user) =>user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSave = () => {
    onSave(assignTaskid, selectedUsers);
    onclose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
        </div>

        {/* Seçilmiş istifadəçilər */}
        <div className={styles.selectedUsers}>
          {selectedUsers.map((user) => (
            <button
              key={user.id}
              className={styles.selectedUserItem}
              onClick={() => toggleUserSelection(user)}
            >
              {user.name}
              <span className={styles.removeUser}>×</span>
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="İstifadəçi axtar..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className={styles.usersList}>
          {filteredUsers.map((user) => {
            const disabled = assignedUserIds.includes(user.id);
            const selected = isSelected(user.id);

            return (
              <li
                key={user.id}
                className={`${styles.userItem} ${selected ? styles.selected : ""}`}
                style={{ display: disabled ? "none" : "flex" }}
              >
                <button disabled={disabled} onClick={() => toggleUserSelection(user)}>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                </button>
                {selected && <span className={styles.checkmark}>✓</span>}
              </li>
            );
          })}
        </ul>

        <div className={styles.modalFooter}>
          <button onClick={closeAssignModal} className={styles.cancelButton}>
            Bağla
          </button>
          <button onClick={handleSave} className={styles.submitButton}>
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignUserModal;
