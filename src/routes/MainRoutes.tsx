import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "../pages/register/Registe"

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes