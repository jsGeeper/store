import React, { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import FormInput from '../../../form/FormInput';
import CustomDatePicker from '../../../form/CustomDatePicker';
import { SimpleButton } from '../../../button/SimpleButton';
import { UploadSingleFile } from '../../../uploads';
import { ExpertExperienceContext } from '../../../../contexts';
import { useUploadSingleFileToS3 } from '../../../../hooks/useUploadSingleFileToS3';
import { updateLicense } from '../../../../redux/slice/get-started/getStartedAction';
import { IRootReducerState } from '../../../../redux/IRootReducer';

const validationSchema = Yup.object().shape({
  certification: Yup.string().required('Certification Name is required'),
  issuing_authority: Yup.string().required('Issuing Authority is required'),
  issue_date: Yup.string().required('Issue Date is required')
});

const LicenceAndCert = () => {
  const [file, setFile] = useState<any>(null);

  const { onCancel } = React.useContext(ExpertExperienceContext);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const { isLoading, upload, uri } = useUploadSingleFileToS3();

  const formik = useFormik({
    initialValues: {
      certification: '',
      issuing_authority: '',
      issue_date: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(
          updateLicense({
            id: user.id,
            certification_name: values.certification,
            issuingOrg: values.issuing_authority,
            issueDate: values.issue_date,
            cert_image: uri
          })
        );
        setSubmitting(false);
        onCancel();
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const handleDropSingleFile = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      upload(file);
      setFile({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  return (
    <main className='licence-and-cert'>
      <div className='experience__form-title'>
        <h2>Licences and Certifications</h2>
        <p>Fill the information below correctly </p>
      </div>

      <div className='form__container'>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormInput
              name='certification'
              label='Certification'
              placeholder='Name of cerification'
              hasMessage={true}
            />
            <br />
            <FormInput
              name='issuing_authority'
              label='Issuing organization'
              placeholder='Organization name'
              hasMessage={true}
            />
            <br />
            <CustomDatePicker placeholder='MM/YY' name='issue_date' hasMessage={true} label='Issue date' />
            <br />
            <br />
            <UploadSingleFile
              file={file}
              maxFiles={1}
              accept={'image'}
              formLabel='Upload Certificate'
              onDrop={handleDropSingleFile}
              displayPreview={isLoading}
            />
            <br />
            <span className='text--md medium noLine mb-3 text-success'>+ Add New Experience</span>
            <br />
            <div className='footer-button mt-2'>
              <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' onClick={onCancel} />
              <SimpleButton label='Complete' type='submit' />
            </div>
          </Form>
        </FormikProvider>
      </div>
    </main>
  );
};

export default LicenceAndCert;
