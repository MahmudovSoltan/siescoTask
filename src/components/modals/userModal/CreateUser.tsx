import { useState } from 'react';
import styles from "./css/createuser.module.css";          // istəsən köhnə stepper.css‑dən kopyala
import { IoMdClose } from 'react-icons/io';
import { useUsersStore } from '../../../store/users.store';
import { isValidEmail, isValidName, isValidPassword } from '../../../utils/validations';
import Button from '../../../ui/button';
// modalı bağlamaq üçün

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const initialState: FormData = {
  name: '',
  surname: '',
  email: '',
  password: '',           // default şifrə – dəyişdirilə bilər
};

interface ErrState {
  name: boolean;
  surname: boolean;
  email: boolean;
  password: boolean;
}

const CreateUserModal = () => {
  const [data, setData] = useState<FormData>(initialState);
  const [err, setErr] = useState<ErrState>({
    name: false,
    surname: false,
    email: false,
    password: false,
  });

  const { addUser ,users,closeUserlistModal} = useUsersStore();

  const validate = () => {
    const nextErr: ErrState = {
      name: !isValidName(data.name),
      surname: !isValidName(data.surname),
      email: !isValidEmail(data.email),
      password: !isValidPassword(data.password),
    };
    setErr(nextErr);
    return !Object.values(nextErr).includes(true);
  };
  console.log(users);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      addUser({ ...data });          // store‑a əlavə et
      closeUserlistModal();           // modalı bağla
      setData(initialState);         // formu sıfırla
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.outlet} onClick={closeUserlistModal} />
      <div className={styles.modal_content}>
        <button onClick={closeUserlistModal} className={styles.close_btn}>
          <IoMdClose size={24} />
        </button>

        <h2 className={styles.title}>İstifadəçi yarat</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Ad"
            value={data.name}
            onChange={handleChange}
            className={`${styles.input} ${err.name ? styles.error : ''}`}
          />
          {err.name && <p className={styles.errorText}>Ad yalnız hərflərdən ibarət olmalıdır.</p>}

          <input
            name="surname"
            placeholder="Soyad"
            value={data.surname}
            onChange={handleChange}
            className={`${styles.input} ${err.surname ? styles.error : ''}`}
          />
          {err.surname && <p className={styles.errorText}>Soyad yalnız hərflərdən ibarət olmalıdır.</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className={`${styles.input} ${err.email ? styles.error : ''}`}
          />
          {err.email && <p className={styles.errorText}>Düzgün email daxil edin.</p>}

          <input
            type="text"
            name="password"
            placeholder="İlkin şifrə"
            value={data.password}
            onChange={handleChange}
            className={`${styles.input} ${err.password ? styles.error : ''}`}
          />
          {err.password && (
            <p className={styles.errorText}>
              Şifrə ən azı 6 simvol, hərf və rəqəm kombinasiyası olmalıdır.
            </p>
          )}

          <Button onclick={()=>{}} bgColor="#0D9CD8" title="Yarat" />
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
