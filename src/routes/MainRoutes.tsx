import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import Dashboard from "../pages/dashboard"
import { ROUTE } from "../constants/Routes"
import Register from "../pages/register/Register"

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE.LOGIN} element={<Login />} />
                <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTE.REGISTER} element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes