import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Field } from 'formik';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import SelectableDropDown from './SelectableDropDown';

interface IProps {
  label: string;
  placeholder: string;
  name: string;
  items: any;
  selectedItem: any;
  onSelectItem: (item: any) => void;
  inputLabel?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  actionText?: string;
  showAddButton?: boolean;
}

const ParentSelector: React.FC<IProps> = ({
  label,
  name,
  onSelectItem,
  selectedItem,
  inputLabel,
  inputPlaceholder,
  buttonText,
  actionText,
  items,
  placeholder,
  showAddButton = true
}: IProps) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className='selectorAffixable'>
      <Typography variant='h5' fontWeight={'700'} gutterBottom style={{ color: '#344054' }}>
        {label}
      </Typography>
      <div className='selectorAffixable__form' onClick={toggleDropdown}>
        <Field
          type={'text'}
          autoComplete='off'
          value={selectedItem}
          placeholder={placeholder}
          className='input'
          id={'selectableField'}
          name={name}
        />
        {showDropDown ? (
          <FiChevronUp size={20} color={'#667085'} className='icon' />
        ) : (
          <FiChevronDown size={20} color={'#667085'} className='icon' />
        )}
      </div>
      {showDropDown && (
        <SelectableDropDown
          items={items}
          handleClose={() => setShowDropDown(false)}
          visible={showDropDown}
          selectedItem={selectedItem}
          handleSelect={onSelectItem}
          inputLabel={inputLabel}
          inputPlaceholder={inputPlaceholder}
          buttonText={buttonText}
          actionText={actionText}
          showAddButton={showAddButton}
        />
      )}
    </div>
  );
};

export default ParentSelector;
