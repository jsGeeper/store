import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
/*
 * ? Local imports
 */
import { UploadSingleFile } from '../../uploads';
import { postStoreSetup } from '../../../redux/slice/stall/stallActions';
import FormInput from '../../form/FormInput';
import FormSelectField from '../../form/FormSelectField';
import { SimpleButton } from '../../button/SimpleButton';
import useGetCategories from '../../../react-query/hooks/useGetCategories';
import useStates from '../../../react-query/hooks/useStates';
import useLGA from '../../../react-query/hooks/useLGA';
import useDetermineUniStore from '../../../react-query/hooks/useDetermineUniStore';
import useCreateStore from '../../../react-query/hooks/useCreateStore';
import { store } from '../../../redux/store';

interface IProps {
  categories: any[];
  onNextStep: () => void;
  user: any;
}

const validationSchema = Yup.object().shape({
  storeName: Yup.string().min(3, 'Store name is too short').required('Store name is required'),
  storeDescription: Yup.string().required('Store description is required'),
  storeCategory: Yup.string().required('Store category is required'),
  storeImage: Yup.string().required('Store logo is required'),
  lga: Yup.string().required('City is required'),
  state: Yup.string().required('State is required')
});

const StallSetupComponent: React.FC<IProps> = ({ onNextStep, user }: IProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const createPreview = useCallback((file: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      formik.setFieldValue('storeImage', e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);
  // api calls for state,location and lga
  const [currentState, setCurrentState] = useState<number>(0);
  const { data: storecategories } = useGetCategories();
  const { data: state } = useStates(1);
  const { data: city, refetch } = useLGA(currentState);
  const { mutate, data: mutateData, error: mutateError } = useDetermineUniStore();
  const {
    mutate: mutateStore,
    isLoading,
    error
  } = useCreateStore({
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value && e.target.value?.length > 3) {
      mutate({ store_name: e.target.value });
    }
  }

  const formik = useFormik({
    initialValues: {
      storeName: '',
      storeDescription: '',
      storeCategory: '',
      storeImage: '',
      lga: '',
      state: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // try {
      //   await dispatch(
      //     postStoreSetup({
      //       storeName: values.storeName,
      //       storeDescription: values.storeDescription,
      //       id: user.id,
      //       storeCategory: values.storeCategory,
      //       storeImage: values.storeImage
      //     })
      //   ).then(() => {
      //     setSubmitting(false);
      //     enqueueSnackbar('Store setup completed', { variant: 'success' });
      //     onNextStep();
      //   });
      // } catch (error: any) {
      //   setSubmitting(false);
      //   enqueueSnackbar(error.message, { variant: 'error' });
      //   setErrors(error);
      // }
      if (mutateData && mutateData.message) {
        const reqBody = {
          store_category: parseFloat(values.storeCategory),
          short_description: values.storeDescription,
          state: parseFloat(values.state),
          lga: parseFloat(values.lga),
          agreeToTerms: true,
          banner: values.storeImage,
          store_name: values.storeName
        };
        mutateStore(reqBody);
      }
    }
  });

  useEffect(() => {
    if (currentState) {
      refetch();
    }
  }, [currentState]);

  return (
    <main className={'formwrap'}>
      <div className='storeInit__form-title'>
        <h2>Store Setup</h2>
        <p>
          Correctly enter the required information. Buyers visiting your store on Go-Geeper&apos;s Marketplace would see
          this.
        </p>
      </div>
      <div className='form-container'>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} autoComplete={'off'} noValidate encType='multipart/form-data'>
            <UploadSingleFile
              file={formik.values.storeImage}
              maxFiles={1}
              accept={'image'}
              displayPreview
              colorHeader={'Upload your store’s logo'}
              subHeaderText='Max size:5mb'
              onDrop={(acceptedFiles: any[]) => {
                formik.setFieldValue('storeImage', acceptedFiles[0]);
              }}
            />
            {formik.errors.storeImage && <p style={{ color: 'red' }}>{formik.errors.storeImage}</p>}
            <br />
            <div className='mb-1'>
              <FormInput
                name={'storeName'}
                label={'Store Name'}
                placeholder={'e.g Abbey and sons farms'}
                onBlur={handleBlur}
                mutateData={mutateData}
                mutateError={mutateError}
                hasMessage={true}
              />
            </div>
            <div className='mb-1'>
              <FormInput
                name={'storeDescription'}
                label={'Store Description'}
                placeholder={'Give a short description of your store'}
                hasMessage={true}
              />
            </div>
            <div className='mb-1'>
              <FormSelectField
                name={'storeCategory'}
                // data={categories}
                label={'Store Category'}
                placeholder={'Select Category'}
                data={storecategories}
              />
            </div>
            <div className='mb-1'>
              <FormSelectField
                name={'state'}
                // data={categories}
                label={'Store Location'}
                data={state}
                placeholder={'Select Location'}
                handleFun={setCurrentState}
              />
            </div>
            <div className='mb-1'>
              <FormSelectField
                name={'lga'}
                data={city}
                label={'Local Government'}
                placeholder={'Select Lga'}
                key={currentState}
              />
            </div>
            <div className='footer-button'>
              <SimpleButton label={'Create Store'} type={'submit'} />
            </div>
          </Form>
        </FormikProvider>
      </div>
    </main>
  );
};

export default StallSetupComponent;
