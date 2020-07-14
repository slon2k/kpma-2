import { useState, ChangeEvent } from "react";

function useForm<T>(initial: T): any {
  const [form, setForm] = useState(initial);

  const [language, setLanguage] = useState("ru");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [event.target.name]: parseInt(event.target.value) });
  };

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.checked });
  };

  return {
    form,
    setForm,
    handleChange,
    handleSelect,
    handleCheck,
    language,
    setLanguage,
  };
}

export default useForm;
