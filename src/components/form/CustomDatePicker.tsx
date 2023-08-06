import React, { useState } from 'react';
import { Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import { useFormikContext } from 'formik';

import 'react-datepicker/dist/react-datepicker.css';
import { ErrorText } from './ErrorText';

interface IProps {
  label?: string;
  name: string;
  placeholder: string;
  isDateRange?: {
    enable?: boolean;
    startDateName: string;
    endDateName: string;
  };
  hasMessage?: boolean;
  [propName: string]: any;
}

const CustomDatePicker: React.FC<IProps> = ({
  label,
  placeholder,
  name,
  isDateRange = { enable: false, startDateName: '', endDateName: '' },
  hasMessage
}: IProps) => {
  const [startDate, setStartDate] = useState(new Date('1990-01-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [defaultDate, setDefaultDate] = useState(new Date());

  const { touched, errors, values, setFieldValue } = useFormikContext<IProps>();

  return (
    <div id='datePicker'>
      <div className='formInput__wrapper'>
        {isDateRange.enable ? (
          <div className='datePicker__wrapper'>
            <div className='formik-inputs' style={{ flex: 1, marginRight: '2rem' }}>
              <Typography variant='h5' fontWeight={'700'} gutterBottom style={{ color: '#344054' }}>
                Start Date
              </Typography>
              <DatePicker
                value={values[isDateRange.startDateName]}
                selected={startDate}
                selectsStart
                endDate={endDate}
                onChange={(date: Date) => {
                  setStartDate(date);
                  setFieldValue(isDateRange.startDateName, date);
                }}
                className={
                  touched[isDateRange.startDateName] && errors[isDateRange.startDateName]
                    ? 'input-field-error  date-picker'
                    : 'input-field  date-picker'
                }
                dateFormat='MM/yyyy'
                placeholderText={placeholder}
                minDate={new Date('1990-01-01')}
                scrollableYearDropdown
                showYearDropdown
                yearDropdownItemNumber={15}
                name={isDateRange.startDateName}
              />
              {hasMessage && touched[isDateRange.startDateName] && errors[isDateRange.startDateName] ? (
                <ErrorText error={errors[isDateRange.startDateName]} visible={touched[isDateRange.startDateName]} />
              ) : null}
            </div>
            <div className='formik-inputs' style={{ flex: 1 }}>
              <Typography variant='h5' fontWeight={'700'} gutterBottom style={{ color: '#344054' }}>
                End Date
              </Typography>
              <DatePicker
                value={values[isDateRange.endDateName]}
                selected={endDate}
                selectsEnd
                startDate={startDate}
                onChange={(date: Date) => {
                  setEndDate(date);
                  setFieldValue(isDateRange.endDateName, date);
                }}
                className={
                  touched[isDateRange.endDateName] && errors[isDateRange.endDateName]
                    ? 'input-field-error  date-picker'
                    : 'input-field  date-picker'
                }
                dateFormat='MM/yyyy'
                placeholderText={placeholder}
                scrollableYearDropdown
                showYearDropdown
                yearDropdownItemNumber={15}
                maxDate={new Date()}
                name={isDateRange.endDateName}
              />

              {hasMessage && touched[isDateRange.endDateName] && errors[isDateRange.endDateName] ? (
                <ErrorText error={errors[isDateRange.endDateName]} visible={touched[isDateRange.endDateName]} />
              ) : null}
            </div>
          </div>
        ) : (
          <div className='formik-inputs'>
            <Typography variant='h5' fontWeight={'700'} gutterBottom style={{ color: '#344054' }}>
              {label}
            </Typography>
            <DatePicker
              value={values[name]}
              selected={defaultDate}
              onChange={(date: Date) => {
                setDefaultDate(date);
                setFieldValue(name, date);
              }}
              className={touched[name] && errors[name] ? 'input-field-error  date-picker' : 'input-field  date-picker'}
              dateFormat='dd/MM/yyyy'
              placeholderText={placeholder}
              scrollableYearDropdown
              showYearDropdown
              yearDropdownItemNumber={15}
              name={name}
            />
            {hasMessage && touched[name] && errors[name] ? (
              <ErrorText error={errors[name]} visible={touched[name]} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;
