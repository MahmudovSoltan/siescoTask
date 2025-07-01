import { useState } from 'react';
import styles from './css/stepper.module.css';

const Stepper2 = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form_group}>
        <label htmlFor="username">İstifadəçi adı</label>
        <input
          type="text"
          name="username"
          id="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Məsələn: soltan123"
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="password">Şifrə</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Şifrənizi daxil edin"
          minLength={6}
        />
      </div>
    </div>
  );
};

export default Stepper2;
