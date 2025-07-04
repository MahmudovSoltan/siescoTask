import { useState } from 'react';
import styles from "./css/createuser.module.css";          // istəsən köhnə stepper.css‑dən kopyala
import { IoMdClose } from 'react-icons/io';
import { useUsersStore } from '../../../store/users.store';
import { isValidEmail, isValidName, isValidPassword } from '../../../utils/validations';
import Button from '../../../ui/button';
import ReusableModal from '../../../ui/reusbleModal';
import { toast } from 'react-toastify';
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
  password: '',
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

  const { addUser, users, closeUserlistModal } = useUsersStore();

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
      setData(initialState);
      toast.success("Successful Add")       // formu sıfırla
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ReusableModal title="İstifadəçi yarat" onClose={closeUserlistModal} handleSave={handleSubmit}>
      <form className={styles.form}>
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
        {err.password && <p className={styles.errorText}>Şifrə minimum 6 simvol olmalıdır.</p>}
      </form>
    </ReusableModal>
  );
};

export default CreateUserModal;
