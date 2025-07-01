import React, { useState } from 'react';
import styles from './css/registerForm.module.css';
import { isValidEmail, isValidName, isValidPassword } from '../../utils/validations';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useShallow } from 'zustand/shallow';

interface RegisterFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
}
interface RegisterErrData {
  name: boolean;
  surname: boolean;
  email: boolean;
  password: boolean;
}

const Register = () => {
  const [data, setData] = useState<RegisterFormData>({
    name: "",
    surname: "",
    email: "",
    password: ""
  });
  const { register, user } = useAuthStore(
    useShallow((state) => ({
      register: state.register,
      user: state.user
    }))
  );
  const [error, setError] = useState<RegisterErrData>({
    name: false,
    surname: false,
    email: false,
    password: false
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setData(prev => ({
      ...prev,
      [name]: value
    }));

    setError(prev => ({
      ...prev,
      [name]: false
    }));
  };
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newError = {
      name: !isValidName(data.name),
      surname: !isValidName(data.surname),
      email: !isValidEmail(data.email),
      password: !isValidPassword(data.password)
    };

    setError(newError);

    if (!Object.values(newError).includes(true)) {
      register(data)
      navigate("/")
    }
  };


  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Qeydiyyat</h2>

        <input
          type="text"
          name="name"
          placeholder="Ad"
          value={data.name}
          onChange={handleChange}
          className={`${styles.input} ${error.name && styles.error}`}

        />
        {
          error.name && <p className={styles.errorText}>Ad mütləq yazılmalıdır</p>
        }
        <input
          type="text"
          name="surname"
          placeholder="Soyad"
          value={data.surname}
          onChange={handleChange}
          className={`${styles.input} ${error.surname && styles.error}`}

        />
        {
          error.surname && <p className={styles.errorText}>Soyad mütləq yazılmalıdır</p>
        }
        <input
          type="text"
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
            Hesabın varsa <span onClick={() => navigate("/")}>Daxil ol</span>
          </p>
        </div>
        <button type="submit" className={styles.button}>
          Qeydiyyatdan keç
        </button>
      </form>
    </div>
  );
};

export default Register;
