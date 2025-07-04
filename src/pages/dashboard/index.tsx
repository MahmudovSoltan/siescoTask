import DashBoardBody from "../../components/dashboard/DashBoardBody"
import Aside from "../../components/layout/aside/Aside"
import { useState } from "react"
const Dashboard = () => {
    const tab = localStorage.getItem("tab")
    const [currentTab, setCurentTab] = useState<string>( tab||"Users")

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