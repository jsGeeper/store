import React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import FormInput from '../form/FormInput';
import { SimpleButton } from '../button/SimpleButton';

interface IProfessionalBioProps {
  user: any;
}

const validationSchema = Yup.object().shape({
  bio_title: Yup.string().required('Title is required'),
  bio_description: Yup.string().required('Description is required')
});

const ProfessionalBio: React.FC<IProfessionalBioProps> = ({ user }: IProfessionalBioProps) => {
  const formik = useFormik({
    initialValues: {
      bio_title: '',
      bio_description: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(false);
      } catch (error: any) {
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  return (
    <div className='form-container mb-1'>
      <h1 className='form-title'>Professional Bio</h1>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className='mb-1'>
            <FormInput
              name='bio_title'
              label='Title'
              placeholder='E.g Veterinarian, Irrigation Specialist'
              hasMessage={true}
            />
          </div>

          <FormInput
            as='textarea'
            rows={6}
            cols={60}
            name='bio_description'
            label={'Description'}
            hasMessage={true}
            placeholder={'Describe what you do.'}
          />

          <div className='row right mt-2'>
            <SimpleButton label={'Save Changes'} />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ProfessionalBio;
