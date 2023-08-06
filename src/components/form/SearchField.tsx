import { FormControl, IconButton, InputAdornment, OutlinedInput, styled } from '@mui/material';
import React from 'react';
import { RiSearchLine } from 'react-icons/ri';

interface SearchFieldProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number | string;
}

const StyledTextfield = styled(OutlinedInput)({
  fontWeight: 600,
  border: '1px solid #98A2B3',
  borderRadius: '8px',
  '& .MuiOutlinedInput-input': {
    // padding: '1rem',
    padding: '10px 14px',
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 600
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
    borderRadius: '0',
    outline: 'none !important'
  }
});

export const SearchField: React.FC<SearchFieldProps> = ({ onChange, placeholder, width = 350 }: SearchFieldProps) => {
  return (
    <FormControl sx={{ width }}>
      <StyledTextfield
        id='job-search'
        placeholder={placeholder}
        onChange={onChange}
        startAdornment={
          <InputAdornment position='start'>
            <IconButton aria-label='job search field' edge='start'>
              <RiSearchLine size={20} color='#98A2B3' />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
