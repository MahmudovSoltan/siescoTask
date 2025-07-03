import { useShallow } from "zustand/shallow"
import { useUsersStore } from "../../store/users.store"
import ReusbleTable from "../../ui/resubleTable"
import TableHeader from "../../ui/tableHeader"
import CreateUserModal from "../../components/modals/userModal/CreateUser"


const Users = () => {
  const { users, userListModal, openUserlistModal, closeUserlistModal } = useUsersStore(useShallow((state) => ({
    users: state.users,
    userListModal: state.userListModal,
    openUserlistModal: state.openUserlistModal,
    closeUserlistModal: state.closeUserlistModal

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
        <TableHeader title="Users" onclick={openUserlistModal} />
        <ReusbleTable data={users} onActions={{
          assign: assignTask,
          changeStatus: changeTaskStatus,
          resetPassword: resetPassword,
          deleteUser: deleteUser,
        }} type={"user"} />

      </div>
      {
        userListModal && <CreateUserModal />
      }
    </>
  )
}

export default Users