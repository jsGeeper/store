import React from 'react';
import { useFormikContext } from 'formik';
import ParentSelector from './component/ParentSelector';
import { ErrorText } from '../ErrorText';

interface IProps {
  label: string;
  name: string;
  placeholder: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  actionText?: string;
  items: any;
  [propName: string]: any;
}

const SelectorAffixable: React.FC<IProps> = ({
  label,
  items,
  placeholder,
  name,
  inputLabel,
  inputPlaceholder,
  buttonText,
  actionText,
  ...otherProps
}: IProps) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<IProps>();

  return (
    <>
      <ParentSelector
        label={label}
        placeholder={placeholder}
        items={items}
        selectedItem={values[name]}
        onSelectItem={(item) => setFieldValue(name, item)}
        name={name}
        inputLabel={inputLabel}
        inputPlaceholder={inputPlaceholder}
        buttonText={buttonText}
        actionText={actionText}
        {...otherProps}
      />
      <ErrorText error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default SelectorAffixable;
