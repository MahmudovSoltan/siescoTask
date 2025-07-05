import { IoIosAdd } from 'react-icons/io'
import styles from './css/button.module.css'
interface IButton {
    onclick?: (e: React.FormEvent) => void,
    title: string,
    bgColor: string,
    variant?: string
}
const Button = ({ onclick, title, bgColor, variant }: IButton) => {
    return (
        <>
            {
                variant ? <button className={styles.table_header_btn} onClick={onclick}><IoIosAdd size={24} />
                    Create {title}</button> : <button className={styles.buton} style={{ backgroundColor: bgColor }} onClick={onclick}>
                    {title}
                </button>
            }

        </>
    )
}

export default Button