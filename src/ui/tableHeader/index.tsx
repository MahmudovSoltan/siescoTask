import styles from './css/tableheader.module.css'
import Button from '../button'
import { useAuthStore } from '../../store/authStore'


interface HeaderProps {
    title: string,
    onclick?: () => void
}

const TableHeader = ({ title, onclick }: HeaderProps) => {
    const { user } = useAuthStore()
    const admin = user?.role === "admin"



    return (
        <div className={styles.table_header_contianer}>
            <p className={styles.table_header_text}>
                {title}
            </p>
            {
                admin && <Button onclick={onclick} title={title} bgColor='#f6e4b4' variant="create" />
            }

        </div>
    )
}

export default TableHeader