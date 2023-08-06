import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import moment from 'moment';
import { SimpleButton } from '../../../button/SimpleButton';
import { CalendarPicker } from '../../../calendar';
import { IRootReducerState } from '../../../../redux/IRootReducer';
import { getTimerAction, updateVerificationSchedule } from '../../../../redux/slice/get-started/getStartedAction';
import { ErrorText } from '../../../form/ErrorText';
import { UserVerificationContext } from '../../../../contexts';

interface IScheduledCallProps {
  userID: string;
}

const validationSchema = Yup.object().shape({
  call_time: Yup.string().required('Select Time')
});

const ScheduledCall: React.FC<IScheduledCallProps> = ({ userID }: IScheduledCallProps) => {
  const dispatch = useDispatch();
  const { getTimer } = useSelector((state: IRootReducerState) => state.getStarted);
  const { onNextStep, onCancel } = React.useContext(UserVerificationContext);
  const { enqueueSnackbar } = useSnackbar();

  const [timerArr, setTimerArr] = useState<any[]>([]);

  React.useEffect(() => {
    if (getTimer.length > 0) setTimerArr(getTimer);
  }, [getTimer, dispatch]);

  const formik = useFormik({
    initialValues: {
      call_date: new Date(),
      call_time: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(
          updateVerificationSchedule({ id: userID, call_date: values.call_date, call_time: values.call_time })
        );
        setSubmitting(false);
        enqueueSnackbar('Appointment Scheduled Successfully', { variant: 'success' });
        onNextStep();
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  React.useEffect(() => {
    dispatch(getTimerAction());
  }, [formik.values.call_date]);

  const { handleSubmit, values, handleChange, errors, touched } = formik;

  return (
    <div id='scheduleCall'>
      <main className='form-wrapper'>
        <div className='kyc__form-title'>
          <h2>Schedule verification call</h2>
          <p>Pick a suitable date and time for your verification call with someone from our team.</p>
        </div>
        <div className='form__container'>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <CalendarPicker name='call_date' hasMessage={true} />
              <div className='timetable'>
                <p className='date'>
                  Available time for <span>{moment(values.call_date).format('LL')}</span>
                </p>
                <div className='timers'>
                  {timerArr.map((x) => (
                    <input
                      key={x.id}
                      name='call_time'
                      type='button'
                      value={x.timer}
                      onClick={handleChange}
                      className={`timer-btn ${values.call_time === x.timer ? 'active' : ''}`}
                    />
                  ))}
                </div>
                {errors.call_time && <ErrorText error={errors.call_time} visible={touched.call_time} />}
              </div>

              <div className='footer-button'>
                <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' type='button' onClick={onCancel} />
                <SimpleButton label='Save and Continue' />
              </div>
            </Form>
          </FormikProvider>
        </div>
      </main>
    </div>
  );
};

export default ScheduledCall;
