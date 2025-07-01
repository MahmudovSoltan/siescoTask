import { create } from 'zustand';

interface BoardTypes {
    stepperModal: boolean,
    openStepperModal: () => void,
    closeStepperModal: () => void

}

export const useBoardStore = create<BoardTypes>((set) => ({
    stepperModal: false,
    openStepperModal: () => {
        set({ stepperModal: true })
    },
    closeStepperModal: () => {
        set({ stepperModal: false })
    }

}))