import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import Dashboard from "../pages/dashboard"
import { ROUTE } from "../constants/Routes"
import Register from "../pages/register/Register"
import { ToastContainer } from "react-toastify"

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <ToastContainer position="top-right"
                autoClose={300}
                hideProgressBar={false}
                closeOnClick={false}
                pauseOnFocusLoss
                draggable
                theme="light" />
            <Routes>
                <Route path={ROUTE.LOGIN} element={<Login />} />
                <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTE.REGISTER} element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes