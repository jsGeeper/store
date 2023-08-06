import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { HiPlus } from 'react-icons/hi';
import { FcCheckmark } from 'react-icons/fc';
import FormInput from '../../FormInput';
import { SimpleButton } from '../../../button/SimpleButton';

interface IProps {
  items: any;
  handleClose: () => void;
  visible: boolean;
  handleSelect: (item: any) => void;
  inputLabel?: string;
  selectedItem: string;
  inputPlaceholder?: string;
  buttonText?: string;
  actionText?: string;
  showAddButton?: boolean;
  [propName: string]: any;
}

const actionButtonStyle = {
  color: '#4CA30D',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: '14px',
  ':hover': { backgroundColor: 'transparent' },
  mb: '10px',
  position: 'sticky',
  justifyContent: 'flex-start',
  top: '0',
  width: '100%',
  zIndex: '1',
  backgroundColor: '#fff',
  textTransform: 'none'
};

const submitButtonStyle = {
  padding: '10px 18px',
  gap: '8px',
  width: '103px',
  height: '44px'
};

const dropDownStyle = {
  width: '100%',
  height: '160px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.8rem'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#EAECF0',
    borderRadius: '0.8rem'
  }
};

const AddToList = ({
  inputLabel,
  buttonText,
  items,
  setItems,
  onClose,
  inputPlaceholder
}: {
  inputLabel?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  items: any[];
  setItems: (item: any) => void;
  onClose: () => void;
}) => {
  const [newItem, setNewItem] = useState<string>('');

  const handleFormChange = (e: any) => {
    setNewItem(e.target.value);
  };

  const handleSubmit = () => {
    if (newItem) {
      setItems([{ value: newItem, label: newItem }, ...items]);
      setNewItem('');
      onClose();
    }
  };

  return (
    <Box m={1}>
      <Typography variant='h5' fontWeight={'500'} fontSize={'1.4rem'} style={{ color: '#344054' }}>
        {inputLabel}
      </Typography>
      <Box display={'flex'} alignItems={'center'}>
        <Box flexGrow={1}>
          <FormInput
            name={new Date().getTime().toString()}
            onChange={handleFormChange}
            value={newItem}
            placeholder={inputPlaceholder}
          />
        </Box>
        <Box ml={2}>
          <SimpleButton label={buttonText || ''} type='button' style={submitButtonStyle} onClick={handleSubmit} />
        </Box>
      </Box>
    </Box>
  );
};

const DropDown = ({
  items,
  handleClose,
  handleSelect,
  selectedItem
}: {
  items: any;
  handleClose: () => void;
  handleSelect: (item: any) => void;
  selectedItem: string;
}) => {
  return (
    <Box sx={dropDownStyle}>
      <ul className='list-group'>
        {items.map((item: any) => (
          <li
            className='list-group-item'
            key={item.label}
            onClick={() => {
              handleSelect(item.value);
              handleClose();
            }}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              sx={{
                backgroundColor: selectedItem === item.value ? '#F9FAFB' : 'transparent',
                cursor: 'pointer',
                padding: '10px 14px',
                gap: '8px',
                '&:hover': {
                  backgroundColor: '#F9FAFB',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }
              }}
            >
              <Box flexGrow={1}>
                <Typography variant='h5' fontWeight={'500'} fontSize={'1.4rem'} style={{ color: '#101828' }}>
                  {item.label}
                </Typography>
              </Box>
              {selectedItem === item.value && (
                <Box ml={2}>
                  <FcCheckmark size={20} />
                </Box>
              )}
            </Box>
          </li>
        ))}
      </ul>
    </Box>
  );
};

const SelectableDropDown: React.FC<IProps> = ({
  handleSelect,
  handleClose,
  items,
  inputLabel,
  inputPlaceholder,
  buttonText,
  actionText,
  selectedItem,
  showAddButton
}: IProps) => {
  const [showAddForm, setShowAddForm] = React.useState<boolean>(false);
  const [showList, setShowList] = React.useState<boolean>(false);
  const [tempData, setTempData] = React.useState<any>(items);

  const onOpen = () => {
    setShowAddForm(true);
    setShowList(false);
  };

  const onClose = () => {
    setShowAddForm(false);
    setShowList(true);
  };

  return (
    <div className='selectorAffixable__form__dropdown'>
      {!showAddForm && showAddButton && (
        <Button size='small' startIcon={<HiPlus fill={'#66C61C'} />} onClick={onOpen} sx={actionButtonStyle}>
          {actionText}
        </Button>
      )}
      {showAddForm ? (
        <AddToList
          inputLabel={inputLabel}
          inputPlaceholder={inputPlaceholder}
          buttonText={buttonText}
          items={tempData}
          setItems={setTempData}
          onClose={onClose}
        />
      ) : (
        <DropDown items={tempData} handleClose={handleClose} handleSelect={handleSelect} selectedItem={selectedItem} />
      )}
    </div>
  );
};

export default SelectableDropDown;
