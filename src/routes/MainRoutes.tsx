import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "../pages/login/Login"
import Dashboard from "../pages/dashboard"
import { ROUTE } from "../constants/Routes"
import Register from "../pages/register/Register"
import { ToastContainer } from "react-toastify"
import { useAuthStore } from "../store/authStore"
import Board from "../pages/planing"

const MainRoutes = () => {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={300}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <Routes>
        <Route
          path={ROUTE.DASHBOARD}
          element={user ? <Dashboard /> : <Navigate to={ROUTE.LOGIN} />}
        />
        <Route
          path={ROUTE.LOGIN}
          element={user ? <Navigate to={ROUTE.DASHBOARD} /> : <Login />}
        />
        <Route
          path={ROUTE.PLANING}
          element={user ? <Board /> : <Login />}
        />
        <Route path={ROUTE.REGISTER} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
