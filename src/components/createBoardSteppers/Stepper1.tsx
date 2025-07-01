import { useState } from 'react'
import styles from './css/stepper.module.css'

const Stepper1 = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: ''
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
        <label htmlFor="name">Təşkilatın adı</label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Məsələn: Coders.az"
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="phone">Telefon nömrəsi</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+994 55 123 45 67"
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="address">Ünvan</label>
        <input
          type="text"
          name="address"
          id="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Bakı, Azərbaycan"
        />
      </div>
    </div>
  );
};

export default Stepper1;
