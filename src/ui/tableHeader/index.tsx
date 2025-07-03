import { IoIosAdd } from 'react-icons/io'
import styles from './css/tableheader.module.css'
import Button from '../button'


interface HeaderProps {
    title: string,
    onclick?: () => void
}

const TableHeader = ({ title, onclick }: HeaderProps) => {
    return (
        <div className={styles.table_header_contianer}>
            <p className={styles.table_header_text}>
                {title}
            </p>
            

            <Button onclick={onclick} title={title} bgColor='#f6e4b4' variant="create"/>
        </div>
    )
}

export default TableHeader