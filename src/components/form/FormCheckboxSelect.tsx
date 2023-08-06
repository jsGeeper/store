import React from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import { MdRadioButtonChecked } from 'react-icons/md';

interface IProps {
  formik: any;
  data: any[];
  name: string;
}
export const FormCheckboxSelect: React.FC<IProps> = ({ formik, data, name }: IProps) => {
  const { values, setFieldValue } = formik;

  const handleChange = (event: any) => {
    setFieldValue(name, event.target.value);
  };
  return (
    <Box width={'100%'}>
      <RadioGroup name={name} value={values[name]} onChange={handleChange}>
        {data.map((datum: { value: string; title: string; description?: string }) => {
          const { value, title, description } = datum;
          return (
            <FormControlLabel
              key={value}
              value={value}
              control={
                <Radio
                  size='medium'
                  checkedIcon={<MdRadioButtonChecked fill={'#027A48'} />}
                  sx={{
                    alignSelf: 'flex-start'
                  }}
                />
              }
              label={
                <Box sx={{ ml: 1 }}>
                  <Typography color={'#344054'} fontWeight={500} fontSize={14} gutterBottom={description !== undefined}>
                    {title}
                  </Typography>
                  {description && (
                    <Typography variant='h5' color='#667085' fontWeight={400} fontSize={14}>
                      {description}
                    </Typography>
                  )}
                </Box>
              }
              sx={{
                backgroundColor: values[name] === String(value) ? '#F3FEE7' : '#F9FAFB',
                borderRadius: '10px',
                border: '1px solid',
                borderColor: values[name] === String(value) ? '#4CA30D' : 'transparent',
                p: 1,
                flexGrow: 1,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                margin: 0,
                mb: 2,
                '&:last-child': {
                  mb: 0
                }
              }}
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};
