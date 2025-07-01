import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "../pages/register/Register"
import Login from "../pages/login/Login"
import Dashboard from "../pages/home"

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes