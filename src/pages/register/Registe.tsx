// components/Register.tsx
import React, { useState } from 'react';
import styles from './css/registerForm.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    phone: '',
    address: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form məlumatları:', formData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Təşkilat Qeydiyyatı</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label>Təşkilatın adı</label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <label>Telefon nömrəsi</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <label>Ünvan</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <hr className={styles.separator} />

        <div className={styles.group}>
          <label>İstifadəçi adı</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <label>Şifrə</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Qeydiyyatdan keç
        </button>
      </form>
    </div>
  );
};

export default Register;
