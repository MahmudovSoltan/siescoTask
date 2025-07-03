import { useShallow } from "zustand/shallow";
import { useAuthStore } from "../../../store/authStore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/aside.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5"; // kiçik ox ikonu
import { CiLogout } from "react-icons/ci";

const AsideBottom = () => {
  const { user, logout } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    }))
  );

  const menuRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { name = "", surname = "", role = "" } = user || {};
  const userProfile = `${name.slice(0, 1)}${surname.slice(0, 1)}`;

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  /* ‑‑‐ outside‑click bağlamaq ‑‑‐ */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.bottom_container}>
      <button
        ref={menuRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.profileBtn}
      >
        <div className={styles.avatar}>
          {userProfile || <FaRegUserCircle size={24} />}
        </div>

        <div className={styles.info}>
          <h4>{name + " " + surname}</h4>
          <p>{role}</p>
        </div>

        <IoChevronDown className={styles.chevron} />
        {isOpen && (
          <ul className={styles.dropdown}>
            <li onClick={handleLogOut}><CiLogout />
              Logout</li>
          </ul>
        )}
      </button>
    </div>
  );
};

export default AsideBottom;
