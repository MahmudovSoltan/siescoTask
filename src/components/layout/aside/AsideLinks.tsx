import { FiUsers } from "react-icons/fi"
import { LuNetwork } from "react-icons/lu"
import styles from './css/aside.module.css'
const AsideLinks = ({ handleChooseTab, currentTab }) => {
    return (
        <ul className={styles.aside_links}>
            <li onClick={() => handleChooseTab("Tasks")} className={`${currentTab === "Tasks" && styles.active_link}`}>
                <LuNetwork size={20} />
                <p>   Tasks</p>
            </li>
            <li onClick={() => handleChooseTab("Users")} className={`${currentTab === "Users" && styles.active_link}`}>
                <FiUsers size={20} />    <p>Useers</p>
            </li>
        </ul>
    )
}

export default AsideLinks
