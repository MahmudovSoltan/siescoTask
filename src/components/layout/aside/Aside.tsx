import Logo from '../../logo/Logo'
import AsideBottom from './AsideBottom'
import AsideLinks from './AsideLinks'
import styles from './css/aside.module.css'
export interface AsidePropsTYpe {
    handleChooseTab: (tab: string) => void,
    currentTab: string
}
const Aside = ({ handleChooseTab, currentTab }: AsidePropsTYpe) => {
    return (
        <aside className={styles.aside_container} >
            <div className={styles.aside_top}>
                <Logo />

                <AsideLinks handleChooseTab={handleChooseTab} currentTab={currentTab} />
            </div>
            <div>
                <AsideBottom />
            </div>
        </aside>
    )
}

export default Aside