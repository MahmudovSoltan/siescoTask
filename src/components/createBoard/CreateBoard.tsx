import { useShallow } from 'zustand/shallow'
import { useBoardStore } from '../../store/board.store'
import CreateBoardSteppers from '../createBoardSteppers/CreateBoardSteppers'
import styles from './css/createboard.module.css'
const CreateBoard = () => {
  const { openStepperModal, stepperModal } = useBoardStore(useShallow((state) => ({
    openStepperModal: state.openStepperModal,
    stepperModal: state.stepperModal
  })))
  return (
    <div className={styles.createboard_btn} onClick={openStepperModal}>
      Yeni Təşkilat yarat
      {
        stepperModal && <CreateBoardSteppers />
      }

    </div>
  )
}

export default CreateBoard
