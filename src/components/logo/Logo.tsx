import styles from './css/logo.module.css'
const Logo = () => {
    const storedLogo = localStorage.getItem("myAppAdmin");
    const comapnyLogo = storedLogo ? JSON.parse(storedLogo) : null;

    return (
        <div>
            <h1 className={styles.logo_title}>{comapnyLogo?.organizationName}</h1>
        </div>
    )
}

export default Logo
