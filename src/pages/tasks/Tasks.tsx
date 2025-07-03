import { useShallow } from "zustand/shallow"
import { useTaskStore } from "../../store/task.store"
import ReusbleTable from "../../ui/resubleTable"
import TableHeader from "../../ui/tableHeader"
import TaskModal from "../../components/modals/taskModal/TaskModal"

const Tasks = () => {
    const { tasks, taskModal, openTaskModal, closeTaskModal ,addtasks} = useTaskStore(useShallow((state) => ({
        tasks: state.tasks,
        taskModal:state.taskModal,
        openTaskModal:state.openTaskModal,
        closeTaskModal:state.closeTaskModal,
        addtasks:state.addtasks

    })))
    const assignTask = (task) => {
        alert(`Assigning task: ${task.title}`);
    };

    const changeTaskStatus = (task, newStatus) => {
        console.log(task, newStatus);

    };

    const deleteUser = (user) => {
        console.log(user);

    };

    const resetPassword = (user) => {
        alert(`Resetting password for: ${user.email}`);
    };
    return (
        <>
            <div>
                <TableHeader onclick={openTaskModal} title="Task" />
                <ReusbleTable data={tasks} type={"tasks"} onActions={{
                    assignTask,
                    changeTaskStatus,
                    deleteUser,
                    resetPassword
                }} />
            </div>
            {
                taskModal && <TaskModal onClose={closeTaskModal} onSave={addtasks}/>
            }
        </>
    )
}

export default Tasks