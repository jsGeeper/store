import React, { useState, useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import FormSelectField from '../../../form/FormSelectField';
import FormInput from '../../../form/FormInput';
import { SimpleButton } from '../../../button/SimpleButton';
import { UploadSingleFile } from '../../../uploads';
import { useUploadSingleFileToS3 } from '../../../../hooks/useUploadSingleFileToS3';
import { UserVerificationContext } from '../../../../contexts';
import { postUpdateIdentity } from '../../../../redux/slice/get-started/getStartedAction';
import { IRootReducerState } from '../../../../redux/IRootReducer';

interface ILegals {
  title: string;
  subLabel: string;
  // handleAction?: (values: any) => void;
}

const idOptions = [
  { value: 'NIMC Slip', label: 'NIMC Slip' },
  { value: 'Driver’s License', label: 'Driver’s License' },
  { value: 'National Identity Card', label: 'National Identity Card' },
  { value: 'International Passport', label: 'International Passport' }
];

const validationSchema = Yup.object().shape({
  id_type: Yup.string().required('ID Type is required'),
  id_number: Yup.string().required('Enter ID number')
});

const IDUpload: React.FC<ILegals> = ({ title, subLabel }: ILegals) => {
  const [file, setFile] = useState<any>(null);

  const { isLoading, upload, uri } = useUploadSingleFileToS3();
  const { onCancel, onNextStep } = React.useContext(UserVerificationContext);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state: IRootReducerState) => state.auth);

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

  const formik = useFormik({
    initialValues: {
      id_type: '',
      id_number: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(
          postUpdateIdentity({
            id: user.id,
            role: user.role,
            id_type: values.id_type,
            id_number: values.id_number,
            id_image: uri
          })
        );
        setSubmitting(false);
        enqueueSnackbar('ID Uploaded', { variant: 'success' });
        onNextStep();
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { handleSubmit } = formik;

  return (
    <main className='form-wrapper'>
      <div className='kyc__form-title'>
        <h2>{title}</h2>
        <p>{subLabel}</p>
      </div>
      <div className='form__container'>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className='kyc-horizontal'>
              <FormSelectField
                name='id_type'
                data={idOptions}
                label='ID type'
                placeholder={'Select ID type'}
                className='mb-0 flex-1 mr-1'
              />
              <FormInput name='id_number' label='ID number' placeholder={'1234567890'} />
            </div>

            <br />
            <UploadSingleFile
              file={file}
              accept={'image'}
              maxFiles={1}
              displayPreview={isLoading}
              onDrop={handleDropSingleFile}
            />
            <div className='footer-button'>
              <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' onClick={onCancel} />
              <SimpleButton label='Complete' />
            </div>
          </Form>
        </FormikProvider>
      </div>
    </main>
  );
};

export default IDUpload;
