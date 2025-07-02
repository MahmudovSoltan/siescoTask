import { useShallow } from 'zustand/shallow'
import { useBoardStore } from '../../store/board.store'
import CreateBoardSteppers from '../createBoardSteppers/CreateBoardSteppers'
import styles from './css/createboard.module.css'
import { useTaskStore } from '../../store/task.store'
import { useUsersStore } from '../../store/users.store'
const CreateBoard = () => {
  const { openStepperModal, stepperModal } = useBoardStore(useShallow((state) => ({
    openStepperModal: state.openStepperModal,
    stepperModal: state.stepperModal
  })))
  const {openTaskModal}= useTaskStore()
  const {openUserlistModal}= useUsersStore()
  return (

    <>

      <div className={styles.createboard_btn} onClick={openUserlistModal}>
        Butun istifadeciler
      </div>
      <div className={styles.createboard_btn} onClick={openTaskModal}>
        Yeni task yarat
      </div>
      <div className={styles.createboard_btn} onClick={openStepperModal}>
        Yeni istifadəçi yarat
      </div>
      {
        stepperModal && <CreateBoardSteppers />
      }

    </>
  )
}

export default CreateBoard
