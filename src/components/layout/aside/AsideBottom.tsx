import { useShallow } from "zustand/shallow";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import styles from "./css/aside.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const AsideBottom = () => {
  const { user, logout } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    }))
  );

  const navigate = useNavigate();

  const { name = "", surname = "", role = "" } = user || {};
  const userProfile = `${name.slice(0, 1)}${surname.slice(0, 1)}`;

  const handleLogOut = () => {
    logout();
    navigate("/");
  };



  return (
    <div className={styles.bottom_container}>
      <button
        className={styles.profileBtn}
      >
        <div className={styles.avatar}>
          {userProfile || <FaRegUserCircle size={24} />}
        </div>

        <div className={styles.info}>
          <h4>{name.toUpperCase() + " " + surname.toUpperCase()}</h4>
          <p>{role.toUpperCase()}</p>
        </div>

        <ul className={styles.dropdown}>
          <li onClick={handleLogOut}><CiLogout size={24} color="white" /></li>
        </ul>
      </button>
    </div>
  );
};

export default AsideBottom;
