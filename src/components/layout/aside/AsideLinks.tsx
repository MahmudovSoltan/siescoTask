import { FiUsers } from "react-icons/fi"
import { LuNetwork } from "react-icons/lu"
import styles from './css/aside.module.css'
import type { AsidePropsTYpe } from "./Aside"
import { useAuthStore } from "../../../store/authStore"
const AsideLinks = ({ handleChooseTab, currentTab }: AsidePropsTYpe) => {
    const handleChooseTabFunc = (tab: string) => {
        localStorage.setItem("tab", tab)
        handleChooseTab(tab)
        // window.location.reload()
    }
    const { user } = useAuthStore()


    return (
        <ul className={styles.aside_links}>
            <li onClick={() => handleChooseTabFunc("Tasks")} className={`${currentTab === "Tasks" && styles.active_link}`}>
                <LuNetwork size={20} />
                <p>Tasks</p>
            </li>
            {
                user?.role !== "user" ? <li onClick={() => handleChooseTabFunc("Users")} className={`${currentTab === "Users" && styles.active_link}`}>
                    <FiUsers size={20} /><p>Users</p>
                </li>
                    :
                    <li onClick={() => handleChooseTabFunc("Planning")} className={`${currentTab === "Planning" && styles.active_link}`}>
                        Planing
                    </li>
            }


        </ul>
    )
}

export default AsideLinks
