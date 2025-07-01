import React, { useState } from 'react';
import styles from './css/login.module.css';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../utils/validations';
import { useAuthStore } from '../../store/authStore';
import { useShallow } from 'zustand/shallow';

interface LoginFormData {
  email: string;
  password: string;
}
interface RegisterErrData {

  email: boolean;
  password: boolean;
}
const Login = () => {
  const [data, setData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  const [error, setError] = useState<RegisterErrData>({
    email: false,
    password: false
  });
  const { login, isLoggedIn } = useAuthStore(useShallow((state) => ({
    login: state.login,
    isLoggedIn: state.isLoggedIn
  })))
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newError = {
      email: !isValidEmail(data.email),
      password: !isValidPassword(data.password)
    };

    setError(newError);

    if (!Object.values(newError).includes(true)) {
      login(data)
      if (isLoggedIn) {
        navigate("/dashboard")
      }
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setData({
      ...data,
      [name]: value
    });
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Daxil ol</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className={`${styles.input} ${error.email && styles.error}`}
        />
        {
          error.email && <p className={styles.errorText}>Düzgün email adresi yazin zəhmət olmasa </p>
        }
        <input
          type="password"
          name="password"
          placeholder="Şifrə"
          value={data.password}
          onChange={handleChange}
          className={`${styles.input} ${error.password && styles.error}`}
        />

        {
          error.password && <p className={styles.errorText}>Şifrə ən azı 6 simvoldan ibarət olmalı, hərf və rəqəm daxil etməlidir. Xüsusi simvollara icazə verilmir.
          </p>
        }
        <div>
          <p className={styles.auth_bottom}>
            Hesabın yoxdursa <span onClick={() => navigate("/register")}>Qeydiyyatdan keç</span>
          </p>
        </div>
        <button type="submit" className={styles.button}>
          Daxil ol
        </button>
      </form>
    </div>
  );
};

export default Login;
