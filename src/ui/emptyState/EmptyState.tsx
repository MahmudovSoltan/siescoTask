// ui/EmptyState.tsx
import React from 'react';
import styles from './css/emptyState.module.css';
const imageUSrl =  "https://cdni.iconscout.com/illustration/premium/thumb/empty-file-illustration-download-in-svg-png-gif-formats--list-task-paper-office-work-pack-business-illustrations-4976679.png?f=webp"
interface EmptyStateProps {
    message?: string;
    img_rl?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ message = "Məlumat tapılmadı", img_rl = imageUSrl }) => {
    return (
        <div className={styles.emptyContainer}>
            <div className={styles.emptyBox}>
                <p className={styles.message}>{message}</p>
                <div>
                    <img src={img_rl} alt="" />
                </div>

            </div>
        </div>
    );
};

export default EmptyState;
