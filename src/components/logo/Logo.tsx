
const Logo = () => {
    const storedLogo = localStorage.getItem("myAppAdmin");
    const comapnyLogo = storedLogo ? JSON.parse(storedLogo) : null;
    console.log(comapnyLogo);

    return (
        <div>
            <h1>{comapnyLogo?.organizationName}</h1>
        </div>
    )
}

export default Logo
