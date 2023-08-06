import { useState } from 'react';

interface IForm {
  callback: any;
  initialValues: any;
}

export const useForm = ({ callback, initialValues }: IForm) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return {
    handleChange,
    handleSubmit,
    values
  };
};
