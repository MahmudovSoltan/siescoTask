// pages/Users.tsx
import { useShallow } from "zustand/shallow";
import { useUsersStore } from "../../store/users.store";
import { useTaskStore } from "../../store/task.store";
import ReusbleTable from "../../ui/resubleTable";
import TableHeader from "../../ui/tableHeader";
import CreateUserModal from "../../components/modals/userModal/CreateUser";
import AssignUserModal from "../../components/modals/assignUserModal";



import type { TaskData, UserData } from "../../types";
import { getTaskId, getTaskStatus, getTaskTitle, isTaskAssignedToUser } from "../../utils/helpers";
import EmptyState from "../../ui/emptyState/EmptyState";
import { useState } from "react";
import Paginations from "../../ui/paginate";

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 10;
  const {
    users,
    userListModal,
    openUserlistModal,
    addTasksToUser,
    deleteUser: deleteUserFunc,
  } = useUsersStore(
    useShallow((state) => ({
      users: state.users,
      userListModal: state.userListModal,
      openUserlistModal: state.openUserlistModal,
      addTasksToUser: state.addUserToTask,
      deleteUser: state.deleteUser,
    }))
  );

  const {
    tasks,
    assignUserModal,
    openAssignModal,
    closeAssignModal,
  } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      assignUserModal: state.assignUserModal,
      openAssignModal: state.openAssignModal,
      closeAssignModal: state.closeAssignModal,

    }))
  );

  // Assign Task düyməsi kliklənəndə modal açılır
  const assignTask = (user: UserData | TaskData) => {
    if (user.id) {
      openAssignModal(user.id);

    }

  };

  const changeTaskStatus = (task: TaskData, newStatus: string) => {
    console.log(task, newStatus);
  };

  const deleteUser = (userId: number) => {
    deleteUserFunc(userId);
  };



  const selectedUser = users.find((u) => u.id === assignUserModal.taskId); // taskId burada əslində `userId` kimi istifadə olunur
  const offset = currentPage * itemsPerPage;
  const currentItems = users.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <div className="table_contianer">
        <TableHeader title="Users" onclick={openUserlistModal} />
        {
          users.length > 0 ?
            <>
              <ReusbleTable
                data={currentItems}
                onActions={{
                  assign: assignTask,
                  changeStatus: changeTaskStatus,
                  deleteUser: deleteUser,
                  deleteTask: () => { }
                }}
                type={"user"}
              />
              <Paginations onPageChange={handlePageChange} pageCount={pageCount} />
            </> : <EmptyState message="Not Yet User" img_rl="https://static.vecteezy.com/system/resources/previews/005/073/071/non_2x/user-not-found-account-not-register-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" />
        }

      </div>

      {userListModal && <CreateUserModal />}

      {assignUserModal.open && selectedUser && (
        <AssignUserModal<TaskData>
          title="Tapşırıq seç"
          contextId={selectedUser.id}
          items={tasks}
          onclose={closeAssignModal}
          onSave={addTasksToUser}
          alreadyLinked={isTaskAssignedToUser()}
          getItemKey={(task) => getTaskId(task) ?? 0}
          getItemTitle={getTaskTitle}
          getItemSubtitle={getTaskStatus}
        />
      )}
    </>
  );
};

export default Users;
