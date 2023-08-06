import React from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import { MdRadioButtonChecked } from 'react-icons/md';

interface CheckboxWithLabelSelectorProps {
  formik: any;
  dataToRender: any;
  name: string;
  widthClassName?: string;
}

const CheckboxWithLabelSelector = ({ formik, dataToRender, name, widthClassName }: CheckboxWithLabelSelectorProps) => {
  const { values, setFieldValue } = formik;

  const handleChange = (event: any) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <div className='checkboxWithLabel'>
      <RadioGroup name={name} value={values[name]} onChange={handleChange}>
        {dataToRender.map((datum: { value: string; title: string; description?: string }) => {
          const { value, title, description } = datum;
          return (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio size='medium' checkedIcon={<MdRadioButtonChecked fill={'#027A48'} />} />}
              label={
                <Box sx={{ ml: 1 }}>
                  <p className={'checkboxWithLabel__label mb-1'}>{title}</p>
                  <Typography variant='h5' color='textSecondary'>
                    {description}
                  </Typography>
                </Box>
              }
              className={
                values[name] === String(value) ? `selected ${widthClassName}` : `optionStyle ${widthClassName}`
              }
              sx={{ py: 3, flexGrow: 1, mr: 0, mb: 3 }}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default CheckboxWithLabelSelector;
