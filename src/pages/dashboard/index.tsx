import { useShallow } from "zustand/shallow"
import DashBoardBody from "../../components/dashboard/DashBoardBody"
import Header from "../../components/layout/header/Header"
import TaskModal from "../../components/modals/taskModal/TaskModal"
import { useTaskStore } from "../../store/task.store"
const Dashboard = () => {
    const {taskModal,onSave,closeModal}= useTaskStore(useShallow((state)=>({
        taskModal:state.taskModal,
        closeModal:state.closeTaskModal,
        onSave:state.addtasks
    })))

    return (
        <div>
            <Header />
            <DashBoardBody />
            {
                taskModal &&   <TaskModal onClose={closeModal} onSave={onSave}/>
            }
           
        </div>
    )
}

export default Dashboard