import { create } from 'zustand';
import type { BoardTypes } from '../types';



export const useBoardStore = create<BoardTypes>((set) => ({
    stepperModal: false,
    openStepperModal: () => {
        set({ stepperModal: true })
    },
    closeStepperModal: () => {
        set({ stepperModal: false })
        console.log("click");
        
    }

}))