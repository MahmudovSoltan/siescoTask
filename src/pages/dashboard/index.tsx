import DashBoardBody from "../../components/dashboard/DashBoardBody"
import Aside from "../../components/layout/aside/Aside"
import { useState } from "react"
import { useAuthStore } from "../../store/authStore"
const Dashboard = () => {
    const { user } = useAuthStore()
    const usertab = localStorage.getItem("tab")
    const tab = user?.role === "admin" ? localStorage.getItem("tab") : usertab == "Users" ? "Tasks" : usertab
    const [currentTab, setCurentTab] = useState<string>(tab || "Users")
    const handleChooseTab = (tab: string) => {
        setCurentTab(tab)
    }
    return (
        <div>
            <Aside handleChooseTab={handleChooseTab} currentTab={currentTab} />
            <DashBoardBody currentTab={currentTab} />
        </div>
    )
}

export default Dashboard