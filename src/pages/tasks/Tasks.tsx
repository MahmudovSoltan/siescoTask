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
import EmptyState from "../../ui/emptyState/EmptyState";
import Paginations from "../../ui/paginate";
import { useState } from "react";
const Tasks = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage = 10;
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




    const offset = currentPage * itemsPerPage;
    const currentItems = tasks.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(tasks.length / itemsPerPage);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };
    return (
        <>
            <div className="table_contianer">
                <TableHeader onclick={openTaskModal} title="Task" />
                {
                    tasks.length > 0 ?
                        <ReusbleTable
                            data={currentItems}
                            type={"tasks"}
                            onActions={{
                                assign: assignTask,
                                changeStatus: changeTaskStatus,
                                deleteUser: deleteUser,
                                deleteTask: handleDeleteTask,
                            }}
                        /> : <EmptyState message="Not Yet Task" />
                }
                <Paginations onPageChange={handlePageChange} pageCount={pageCount} />
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
