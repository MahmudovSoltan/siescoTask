import { useShallow } from "zustand/shallow"
import { useTaskStore } from "../../store/task.store"
import ReusbleTable from "../../ui/resubleTable"
import TableHeader from "../../ui/tableHeader"
import TaskModal from "../../components/modals/taskModal/TaskModal"
import AssignUserModal from "../../components/modals/assignUserModal"

const Tasks = () => {
    const { tasks, taskModal, openTaskModal, closeTaskModal, addtasks, removeAsignUser, assignUserModal, openAssignModal, deleteTask, closeAssignModal,addAsignUser } = useTaskStore(useShallow((state) => ({
        tasks: state.tasks,
        taskModal: state.taskModal,
        openTaskModal: state.openTaskModal,
        closeTaskModal: state.closeTaskModal,
        addtasks: state.addtasks,
        removeAsignUser: state.removeAsignUser,
        assignUserModal: state.assignUserModal,
        openAssignModal: state.openAssignModal,
        deleteTask: state.deleteTask,
        closeAssignModal: state.closeAssignModal,
        addAsignUser:state.addAsignUser

    })))
    const assignTask = (task) => {
        openAssignModal(task.id)
    };

    const changeTaskStatus = (task, newStatus) => {
        console.log(task, newStatus);


    };

    const deleteUser = (userid: number, taskId: number) => {
        console.log(userid, "userId", taskId, 'taskId');
        removeAsignUser(userid, taskId)
    };

    const resetPassword = (user) => {
        alert(`Resetting password for: ${user.email}`);
    };
    const handleDeleteTask = (id: number) => {
        deleteTask(id);
        console.log(id);

    }
    return (
        <>
            <div>
                <TableHeader onclick={openTaskModal} title="Task" />
                <ReusbleTable data={tasks} type={"tasks"} onActions={{
                    assign: assignTask,
                    changeStatus: changeTaskStatus,
                    resetPassword: resetPassword,
                    deleteUser: deleteUser,
                    deleteTask: handleDeleteTask

                }} />
            </div>
            {
                assignUserModal.open && <AssignUserModal title={"İstifadəçi Seç"} onclose={closeAssignModal} onSave={addAsignUser}  />
            }

            {
                taskModal && <TaskModal onClose={closeTaskModal} onSave={addtasks} />
            }
        </>
    )
}

export default Tasks