// pages/Login.tsx
import React, { useState } from 'react';
import styles from './css/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../utils/validations';
import { useAuthStore } from '../../store/authStore';
import { useShallow } from 'zustand/shallow';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: false, password: false });

  const { login } = useAuthStore(useShallow((state) => ({ login: state.login })));
  const navigate = useNavigate();

  const validate = () => ({
    email: !isValidEmail(data.email),
    password: !isValidPassword(data.password),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = validate();
    setError(newError);

    if (!Object.values(newError).includes(true)) {
      const success = login(data);
      if (success) navigate('/dashboard');
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Daxil ol</h2>

        <input name="email" placeholder="Email" value={data.email} onChange={handleChange}
          className={`${styles.input} ${error.email ? styles.error : ''}`} />
        {error.email && <p className={styles.errorText}>Düzgün email daxil edin.</p>}

        <input type="password" name="password" placeholder="Şifrə" value={data.password} onChange={handleChange}
          className={`${styles.input} ${error.password ? styles.error : ''}`} />
        {error.password && <p className={styles.errorText}>Şifrə düzgün deyil.</p>}

        <button type="submit" className={styles.button}>Daxil ol</button>
      </form>
    </div>
  );
};

export default Login;
