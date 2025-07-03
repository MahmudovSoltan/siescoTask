import { useShallow } from 'zustand/shallow'
import { useUsersStore } from '../../store/users.store'
import UsersModal from '../modals/userModal/CreateUser'
import Users from '../../pages/users/Users'
import Tasks from '../../pages/tasks/Tasks'
const tabs = [
  {
    title: "Users",
    component: Users
  },
  {
    title: "Tasks",
    component: Tasks
  }
]
interface DashBoardBodyProps {
  currentTab: string;
}

const DashBoardBody = ({ currentTab }: DashBoardBodyProps) => {

  const { userListModal, onclose } = useUsersStore(useShallow((state) => ({
    userListModal: state.userListModal,
    onclose: state.closeUserlistModal
  })))
  const current = tabs.find(tab => tab.title === currentTab);
  const CurrentComponent = current?.component;

  return (
    <div>
      {CurrentComponent && <CurrentComponent />}


    </div>
  )
}

export default DashBoardBody
