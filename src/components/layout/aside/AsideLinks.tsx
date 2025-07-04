import { FiUsers } from "react-icons/fi"
import { LuNetwork } from "react-icons/lu"
import styles from './css/aside.module.css'
import type { AsidePropsTYpe } from "./Aside"
const AsideLinks = ({ handleChooseTab, currentTab }: AsidePropsTYpe) => {
    const handleChooseTabFunc = (tab: string) => {
        localStorage.setItem("tab", tab)
        handleChooseTab(tab)
    }
    return (
        <ul className={styles.aside_links}>
            <li onClick={() => handleChooseTabFunc("Tasks")} className={`${currentTab === "Tasks" && styles.active_link}`}>
                <LuNetwork size={20} />
                <p>Tasks</p>
            </li>
            <li onClick={() => handleChooseTabFunc("Users")} className={`${currentTab === "Users" && styles.active_link}`}>
                <FiUsers size={20} /><p>Useers</p>
            </li>
        </ul>
    )
}

export default AsideLinks
