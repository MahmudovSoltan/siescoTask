import { useUsersStore } from "../../../store/users.store";
import styles from "./usersModal.module.css";

interface Props {
  onClose: () => void;
}

const UsersModal: React.FC<Props> = ({ onClose }) => {
  const { users } = useUsersStore();

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>İstifadəçilər siyahısı ({users.length})</h3>
        <div className={styles.list}>
          {users.map((user, index) => (
            <div key={index} className={styles.userItem}>
              <p><strong>Ad:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ))}
        </div>

        <button onClick={onClose} className={styles.closeBtn}>Bağla</button>
      </div>
    </div>
  );
};

export default UsersModal;
