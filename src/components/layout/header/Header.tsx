import CreateBoard from "../../createBoard/CreateBoard"
import Logo from "../../logo/Logo"
import HeaderRight from "./HeaderRight"
import styles from './css/header.module.css'
const Header = () => {
    return (
        <div className={`${styles.header_container} container`}>
            <Logo />
            <div className={styles.header_right}>
                <CreateBoard />
                <HeaderRight />
            </div>
        </div>
    )
}

export default Header
