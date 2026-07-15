import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

import style from './Form.module.css';

interface FormProps {
  onSabmit: (query: string) => void;
}

export default function Form({ onSabmit }: FormProps) {
  const handleSabmit = (formData: FormData) => {
    const orderData = formData.get('search') as string;
    if (orderData.trim() === '') {
      toast.error("This didn't work.");
      return;
    }
    onSabmit(orderData);
  };
  return (
    <form action={handleSabmit} className={style.form}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
