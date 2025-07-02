import { useShallow } from 'zustand/shallow'
import { useUsersStore } from '../../store/users.store'
import UsersModal from '../modals/userModal/UsersModal'
const DashBoardBody = () => {
  const { userListModal, onclose } = useUsersStore(useShallow((state) => ({
    userListModal: state.userListModal,
    onclose: state.closeUserlistModal
  })))
  return (
    <div>
      {
        userListModal &&
        <UsersModal onClose={onclose} />
      }
    </div>
  )
}

export default DashBoardBody
