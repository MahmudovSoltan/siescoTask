import Logo from '../../logo/Logo'
import AsideBottom from './AsideBottom'
import AsideLinks from './AsideLinks'
import styles from './css/aside.module.css'
const Aside = ({handleChooseTab,currentTab}) => {
    return (
        <aside className={styles.aside_container} >
            <Logo />
            <div>
                <AsideLinks handleChooseTab={handleChooseTab} currentTab={currentTab} />
            </div>
            <div>
                <AsideBottom />
            </div>
        </aside>
    )
}

export default Aside