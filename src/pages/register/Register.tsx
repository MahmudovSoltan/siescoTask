// pages/Register.tsx
import React, { useState } from 'react';
import styles from '../login/css/login.module.css';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword, isValidPhone } from '../../utils/validations';
import { useAuthStore } from '../../store/authStore';
import { useShallow } from 'zustand/shallow';
import { toast } from 'react-toastify';

interface FormData {
  organizationName: string;
  phone: string;
  address: string;
  username: string;
  email: string;
  password: string;
}

interface ErrorData {
  organizationName: boolean;
  phone: boolean;
  address: boolean;
  username: boolean;
  email: boolean;
  password: boolean;
}

const Register = () => {
  const [data, setData] = useState<FormData>({
    organizationName: '',
    phone: '',
    address: '',
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<ErrorData>({
    organizationName: false,
    phone: false,
    address: false,
    username: false,
    email: false,
    password: false,
  });

  const { registerAdmin } = useAuthStore(useShallow((state) => ({
    registerAdmin: state.registerAdmin,
  })));

  const navigate = useNavigate();

  const validate = () => ({
    organizationName: data.organizationName.trim() === '',
    phone: !isValidPhone(data.phone),
    address: data.address.trim() === '',
    username: data.username.trim() === '',
    email: !isValidEmail(data.email),
    password: !isValidPassword(data.password),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newError = validate();
    setError(newError);

    if (!Object.values(newError).includes(true)) {
      const success = registerAdmin({
        ...data,
        name: data.username,
        surname: '',
        role: 'admin',
      });
      if (success) {
        navigate('/dashboard')
        toast.success("Succses register")
      } else {
        toast.error("Something is wrong")
      }
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Qeydiyyat</h2>

        <input name="organizationName" placeholder="Təşkilatın adı" value={data.organizationName} onChange={handleChange}
          className={`${styles.input} ${error.organizationName ? styles.error : ''}`} />
        {error.organizationName && <p className={styles.errorText}>Təşkilatın adı daxil edilməlidir.</p>}

        <input name="phone" placeholder="Telefon nömrəsi" value={data.phone} onChange={handleChange}
          className={`${styles.input} ${error.phone ? styles.error : ''}`} />
        {error.phone && <p className={styles.errorText}>Düzgün telefon nömrəsi daxil edin.</p>}

        <input name="address" placeholder="Ünvan" value={data.address} onChange={handleChange}
          className={`${styles.input} ${error.address ? styles.error : ''}`} />
        {error.address && <p className={styles.errorText}>Ünvan daxil edilməlidir.</p>}

        <input name="username" placeholder="İstifadəçi adı" value={data.username} onChange={handleChange}
          className={`${styles.input} ${error.username ? styles.error : ''}`} />
        {error.username && <p className={styles.errorText}>İstifadəçi adı daxil edilməlidir.</p>}

        <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange}
          className={`${styles.input} ${error.email ? styles.error : ''}`} />
        {error.email && <p className={styles.errorText}>Düzgün email ünvanı daxil edin.</p>}

        <input type="password" name="password" placeholder="Şifrə" value={data.password} onChange={handleChange}
          className={`${styles.input} ${error.password ? styles.error : ''}`} />
        {error.password && <p className={styles.errorText}>Şifrə ən azı 6 simvol, hərf və rəqəm daxil etməlidir.</p>}

        <button type="submit" className={styles.button}>Qeydiyyatdan keç</button>
      </form>
    </div>
  );
};

export default Register;
