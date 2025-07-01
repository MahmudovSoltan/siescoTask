import { useState } from 'react'
import styles from './css/stepper.module.css'
import Stepper1 from './Stepper1'
import Stepper2 from './Stepper2'
import Button from '../../ui/button'
import StepperHeader from './StepperHeader'
import { useBoardStore } from '../../store/board.store'
import { useShallow } from 'zustand/shallow'
const steppers = [
    {
        title: "Təşkilatın Məlumatları",
        component: Stepper1
    },
    {
        title: "Istifadəçi Məlumatları",
        component: Stepper2
    },
]
const CreateBoardSteppers = () => {
    const [stepItem, setStepItem] = useState(0)
    const CurrentComponent = steppers[stepItem].component
    const { closeStepperModal } = useBoardStore(useShallow((state)=>({
        closeStepperModal:state.closeStepperModal
    })))
    const nextStepperFunc = () => {
        if (stepItem < steppers.length - 1) {
            setStepItem(stepItem + 1)
        }
    }
    const prevStepper = () => {
        if (stepItem > 0) { setStepItem(stepItem - 1) }
    }
    return (
        <div className={styles.stepper_container}>
            <div className={styles.outlew}></div>
            <div className={styles.stepper_content}>
                <div  onClick={closeStepperModal}>X</div>
                <StepperHeader />
                <h2>
                    {steppers[stepItem].title}
                </h2>
                <CurrentComponent />
                <div className={styles.stepper_buttons}>
                    <Button bgColor='#0D9CD8' onclick={prevStepper} title='Əvvələ' />
                    <Button bgColor='#0D9CD8' onclick={nextStepperFunc} title='Növbəti' />
                </div>

            </div>
        </div>
    )
}

export default CreateBoardSteppers