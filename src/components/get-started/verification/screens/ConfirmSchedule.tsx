import React, { useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import Calendar from '../../../../assets/svg/calendar.svg';
import Clock from '../../../../assets/svg/clock.svg';
import { SimpleButton } from '../../../button/SimpleButton';
import FormInput from '../../../form/FormInput';
import { getScheduledTimeAction, updateConfirmSchedule } from '../../../../redux/slice/get-started/getStartedAction';
import { IRootReducerState } from '../../../../redux/IRootReducer';
import { PATH_DASHBOARD, PATH_MAIN } from '../../../../router/pages';

interface IProps {
  user: any;
}

const ConfirmSchedule: React.FC<IProps> = ({ user }: IProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getScheduledTime } = useSelector((state: IRootReducerState) => state.getStarted);

  const onCancel = () => {
    navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`);
  };

  useEffect(() => {
    dispatch(getScheduledTimeAction({ id: user.id }));
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: user.email || ''
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(updateConfirmSchedule({ id: user.id, email: values.email }));
        setSubmitting(false);
        navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`);
      } catch (error: any) {
        setErrors(error);
        setSubmitting(false);
      }
    }
  });

  const { handleSubmit } = formik;

  return (
    <div id='confirmSchedule'>
      <main className='form-wrapper'>
        <div className='kyc__form-title'>
          <h2>Confirm schedule</h2>
          <p>Confirm that this is the date and time you picked. An invite would be sent to your mail</p>
        </div>
        <div className='form__container'>
          <div className='verification'>
            <h5 className='title'>Verification call with Go-Geeper</h5>
            <br />

            <ul className='schedule-info'>
              {getScheduledTime &&
                getScheduledTime.length > 0 &&
                getScheduledTime.map((item: any) => (
                  <React.Fragment key={item.id}>
                    <li>
                      <img src={Calendar} alt='calendar' className='icon' />
                      <span>{moment(item.call_date).format('MMMM Do YYYY')}</span>
                    </li>
                    <li>
                      <img src={Clock} alt='clock' className='icon' />
                      <span>{item.call_time}</span>
                    </li>
                  </React.Fragment>
                ))}
            </ul>
          </div>
          <br />
          <div className='form'>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <FormInput name='email' label='Email address' type='email' placeholder='Enter your email address' />
                <div className='footer-button'>
                  <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' onClick={onCancel} />
                  <SimpleButton label='Confirm' />
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmSchedule;
