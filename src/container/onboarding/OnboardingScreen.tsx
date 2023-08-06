import React from 'react';
import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
/*
 * ? Local imports
 */
import { AuthScreenWrapper } from '../../components/layouts/authflow-wrapper';
import CheckboxWithLabelSelector from '../../components/form/CheckboxWithLabelSelector';
import ActionButton from '../../components/button/ActionButton';

const onboardingSchema = Yup.object().shape({
  accountType: Yup.string().required('Account type is required')
});

const ACCOUNT_TYPE = [
  {
    value: 0,
    title: 'I am a Farmer'
  },
  {
    value: 2,
    title: 'I am an Agribusiness owner'
  },
  {
    value: 4,
    title: 'I am an Agric expert'
  },
  {
    value: 6,
    title: 'Others'
  }
];

const OnboardingScreen = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      accountType: ''
    },
    validationSchema: onboardingSchema,
    onSubmit: async (values) => {
      switch (values.accountType) {
        case '0':
          navigate('/registration/access_type=farmer');
          break;
        case '2':
          navigate('/registration/access_type=agriBusinessOwner');
          break;
        case '4':
          navigate('/registration/access_type=agricExpert');
          break;
        case '6':
          navigate('/registration/access_type=other');
          break;
        default:
          return null;
      }
    }
  });

  const { handleSubmit } = formik;

  return (
    <main id='onboarding'>
      <Helmet>
        <title>Onboarding | Go-Geeper</title>
      </Helmet>
      <AuthScreenWrapper>
        <div className='onboarding__container'>
          <Typography variant='h3' align={'center'} fontWeight='600'>
            Select account type
          </Typography>
          <div className='onboarding__form'>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <CheckboxWithLabelSelector formik={formik} name={'accountType'} dataToRender={ACCOUNT_TYPE} />
                <ActionButton label={'Continue'} fullWidth={true} />
              </Form>
            </FormikProvider>
          </div>
        </div>
      </AuthScreenWrapper>
    </main>
  );
};

export default OnboardingScreen;
