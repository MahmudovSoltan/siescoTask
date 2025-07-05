// pages/Tasks.tsx
import { useShallow } from "zustand/shallow";
import { useTaskStore } from "../../store/task.store";
import ReusbleTable from "../../ui/resubleTable";
import TableHeader from "../../ui/tableHeader";
import TaskModal from "../../components/modals/taskModal/TaskModal";
import AssignUserModal from "../../components/modals/assignUserModal";
import { useUsersStore } from "../../store/users.store";
import type { TaskData, UserData } from "../../types";
import { getUserEmail, getUserId, getUserName, isUserAssignedToTask } from "../../utils/helpers";

const Tasks = () => {
    const {
        tasks,
        taskModal,
        openTaskModal,
        closeTaskModal,
        addtasks,
        removeAsignUser,
        assignUserModal,
        openAssignModal,
        deleteTask,
        closeAssignModal,
        addAsignUser,
    } = useTaskStore(
        useShallow((state) => ({
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
            addAsignUser: state.addAsignUser,
        }))
    );

    const { users } = useUsersStore();

    const assignTask = (task: TaskData | UserData) => {
        if ("users" in task && typeof task.id === "number") {
            openAssignModal(task.id);
        } else {
            console.error("Provided object is not a TaskData or task id is invalid");
        }
    };

    const changeTaskStatus = (task: TaskData, newStatus: string) => {
        console.log(task, newStatus);
    };

    const deleteUser = (userId: number, taskId?: number) => {
        if (typeof taskId === "number") {
            removeAsignUser(userId, taskId);
        }
    };



    const handleDeleteTask = (id: number) => {
        deleteTask(id);
    };

    return (
        <>
            <div>
                <TableHeader onclick={openTaskModal} title="Task" />
                <ReusbleTable
                    data={tasks}
                    type={"tasks"}
                    onActions={{
                        assign: assignTask,
                        changeStatus: changeTaskStatus,
                        deleteUser: deleteUser,
                        deleteTask: handleDeleteTask,
                    }}
                />
            </div>
            {assignUserModal.open && (
                <AssignUserModal<UserData>
                    title="İstifadəçi seç"
                    contextId={assignUserModal.taskId}
                    items={users}
                    onclose={closeAssignModal}
                    onSave={addAsignUser}
                    alreadyLinked={isUserAssignedToTask(tasks)}
                    getItemKey={getUserId}
                    getItemTitle={getUserName}
                    getItemSubtitle={getUserEmail}
                />
            )}

      {taskModal && <TaskModal onClose={closeTaskModal} onSave={addtasks} />}
        </>
    );
};

export default Tasks;
