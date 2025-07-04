import { IoMdClose } from 'react-icons/io';
import styles from './css/reusableModal.module.css'; // ortaq style faylı
import Button from '../button';

interface ReusableModalProps {
    onClose: () => void;
    handleSave?: (e: React.FormEvent) => void;
    title: string;
    children: React.ReactNode;
    showActions?: boolean; // buttonlar görsənsin ya yox
}

const ReusableModal = ({ onClose, handleSave, title, children, showActions = true }: ReusableModalProps) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modal_top}>
                    <h2 className={styles.title}>{title}</h2>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <IoMdClose size={24} />
                    </button>
                </div>
                <div className={styles.content}>{children}</div>

                {showActions && (
                    <div className={styles.actions}>
                        <Button bgColor='#007bff' title='Yadda saxla' onclick={handleSave}/>
                        <Button bgColor='gray' title='Bağla' onclick={onClose}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReusableModal;
