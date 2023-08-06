import React from 'react';
import { Field, useFormikContext } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
// import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
// import { YearPicker } from '@mui/x-date-pickers/YearPicker';
import { Grid } from '@mui/material';

interface ICalendarProps {
  name: string;
  hasMessage?: boolean;
  [propName: string]: any;
}

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

const CalendarComponent: React.FC<ICalendarProps> = ({ name, hasMessage }: ICalendarProps) => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  const { values, setFieldValue } = useFormikContext<ICalendarProps>();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={1} sx={{ borderRadius: '8px', border: '1px solid #d0d5dd', marginBottom: '3rem' }}>
        <CalendarPicker
          date={values[name]}
          onChange={(newDate) => {
            setDate(newDate);
            setFieldValue(name, newDate);
          }}
          disablePast
          shouldDisableDate={(date) => date.getTime() < minDate.getTime() || date.getTime() > maxDate.getTime()}
          shouldDisableMonth={(date) => date.getTime() < minDate.getTime() || date.getTime() > maxDate.getTime()}
          views={['day']}
          view='day'
        />
      </Grid>
    </LocalizationProvider>
  );
};

export default CalendarComponent;
