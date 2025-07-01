import styles from './css/button.module.css'
interface IButton {
    onclick: () => void,
    title: string,
    bgColor: string,
}
const Button = ({ onclick, title, bgColor, }: IButton) => {
    return (
        <button  className={styles.buton} style={{ backgroundColor: bgColor }} onClick={onclick}>
            {title}
        </button>
    )
}

export default Button