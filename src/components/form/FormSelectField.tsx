import React from 'react';
import { Box, Typography } from '@mui/material';
import Select from 'react-select';
import { useFormikContext } from 'formik';
import { ErrorText } from './ErrorText';

interface FormSelectFieldProps {
  name: string;
  label: string;
  data: any;
  placeholder: string;
  [propName: string]: any;
  isDependent?: boolean;
  stateValue?: string;
  className?: string;
  handleFun?: React.Dispatch<React.SetStateAction<number>>;
}

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  data,
  label,
  name,
  placeholder,
  isDependent = false,
  className,
  stateValue,
  handleFun = undefined,
  ...otherProps
}: FormSelectFieldProps) => {
  // const [softData, setSoftData] = React.useState<any>(data);
  // const [newArray, setNewArray] = React.useState<any>([]);

  const { touched, errors, setFieldValue, values } = useFormikContext<FormSelectFieldProps>();

  // let filteredData: any = softData;
  // const arr: any = [];

  // handle dependent fields and set the value of the dependent field
  // React.useEffect(() => {
  //   if (data.length !== softData.length) {
  //     setSoftData(data);
  //   }

  //   if (isDependent && stateValue) {
  //     filteredData = softData.filter((item: any) => item[stateValue]).map((item: any) => item[stateValue]);

  //     for (let i = 0; i < filteredData.length; i++) {
  //       filteredData[i].map((item: any, i: any) => {
  //         arr.push({ value: item, label: item });
  //         setNewArray(arr);
  //       });
  //     }
  //   }
  // }, [softData.length, data, isDependent, stateValue]);

  // handle local government fields and set the value of the local government field
  // React.useEffect(() => {
  //   if (newArray.length !== 0) {
  //     setSoftData(newArray);
  //   }
  // }, [newArray.length, softData, newArray]);

  // const defaultValue = (opts: any, val: string) => {
  //   return opts ? opts.find((item: any) => item.label === val) : '';
  // };

  const colourStyles = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      border: '1px solid #D0D5DD',
      borderRadius: '8px',
      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      outline: 'none',
      '&:hover': {
        border: '1px solid #D0D5DD'
      }
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? '#027A48' : isFocused ? '#E5F6F4' : 'transparent',
        color: isDisabled ? '#ccc' : isSelected ? 'white' : '#344054',
        cursor: isDisabled ? 'not-allowed' : 'default',
        minWidth: '0px',
        '&:hover': {
          boxShadow: 'none'
        }
      };
    }
  };

  return (
    <Box className={`fotmSelector ${className}`}>
      <Typography variant='h5' fontWeight={'700'} gutterBottom style={{ color: '#344054' }}>
        {label}
      </Typography>

      <Select
        {...otherProps}
        // value={defaultValue(softData, values[name])}
        // defaultValue={values[name]}
        options={data}
        placeholder={placeholder}
        name={name}
        styles={colourStyles}
        className={touched[name] && errors[name] ? 'input-fied-error select' : 'input-field select'}
        onChange={(e: any) => {
          setFieldValue(name, e.value);
          handleFun && handleFun(parseInt(e.value));
        }}
      />

      {<ErrorText error={errors[name]} visible={touched[name]} />}
    </Box>
  );
};

export default FormSelectField;
