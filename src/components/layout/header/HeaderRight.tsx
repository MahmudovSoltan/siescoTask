import { useShallow } from "zustand/shallow";
import { useAuthStore } from "../../../store/authStore"
import styles from './css/header.module.css'
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { CiLogout } from "react-icons/ci";
const HeaderRight = () => {
  const { user, logout } = useAuthStore(useShallow((state) => ({
    user: state.user,
    logout: state.logout
  })))
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const name = user?.name;
  const surname = user?.surname;
  const role = user?.role


  const userProfile = `${name?.slice(0, 1)}${surname?.slice(0, 1)}`

  const handleLogOut = () => {
    navigate("/")
    logout()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.header_user}>
      <button onClick={() => setIsOpen(!isOpen)}>{userProfile}</button>
      <div ref={menuRef} className={`${styles.peofile_info} ${isOpen && styles.peofile_info_active}`}>
        <p>{name} {surname}</p>
        <p>{role}</p>
        <button className={`${styles.logout_btn}   `} onClick={handleLogOut}>  <CiLogout size={24} />
          Çıxış</button>
      </div>
    </div>
  )
}

export default HeaderRight