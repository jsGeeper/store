import React, { useMemo, useCallback } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../../form/FormInput';
import statesNG from '../../../utils/states';
import FormSelectField from '../../form/FormSelectField';
import { UploadProductFile } from '../../uploads';
import { SelectorAffixable } from '../../form';
import FormInputWithIndicator from '../../form/FormInputWithIndicator';
import nationwideNG from '../../../utils/nationWide';
import { SimpleButton } from '../../button/SimpleButton';
import { postAddProductListing } from '../../../redux/slice/stall/stallActions';
import { PATH_DASHBOARD, PATH_MAIN } from '../../../router/pages';
import { aws_config } from '../../../utils/aws_config';
import { IRootReducerState } from '../../../redux/IRootReducer';

interface IStallListProductsProps {
  categories: any[];
  user: any;
  itemUnits: any[];
  processingTime: any[];
}

const returnsData = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];

const actionButtonStyle = {
  color: '#4CA30D',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: '14px',
  ':hover': { backgroundColor: 'transparent' },
  mb: '10px',
  position: 'sticky',
  justifyContent: 'flex-start',
  top: '0',
  width: '100%',
  backgroundColor: '#fff',
  textTransform: 'none'
};

const validationSchema = Yup.object().shape({
  storeProductName: Yup.string().required('Product Name is required'),
  storeProductLocation: Yup.string().required('Product Location is required'),
  storeProductCategory: Yup.string().required('Select a product category'),
  storeProductSubCategory: Yup.string().required('Select a product sub-category'),
  storeProductDescription: Yup.string().required('Product Description is required'),
  storeProductItemUnit: Yup.string().required('Product Item unit is required'),
  storeProductQuality: Yup.string().required('Enter product quantity'),
  storeProductPrice: Yup.string().required('Price is required'),
  storeProductProcessTime: Yup.string().required('Process Time is required'),
  storeProductDeliveryLocation: Yup.string().required('Delivery Location is required'),
  storeProductAcceptReturns: Yup.string().required('Accept Returns is required'),
  storeImageOne: Yup.string().required('Image is required'),
  storeImageTwo: Yup.string().required('Image is required'),
  storeImageThree: Yup.string().required('Image is required')
});

const StallListProducts: React.FC<IStallListProductsProps> = ({
  categories,
  itemUnits,
  processingTime,
  user
}: IStallListProductsProps) => {
  const [allMedia, setAllMedia] = React.useState<any>([]);
  // const [btnDisabled, setBtnDisabled] = React.useState<boolean>(true);
  const [subCategoryData, setSubCategoryData] = React.useState<any[]>([]);
  const [selectedCatId, setSelectedCatId] = React.useState<string>('');

  const { listStores } = useSelector((state: IRootReducerState) => state.stall);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const mediaCheck = allMedia.filter((file: File) => file !== undefined).length >= 3;

  // React.useEffect(() => {
  //   if (mediaCheck) {
  //     setBtnDisabled(false);
  //   } else {
  //     setBtnDisabled(true);
  //   }
  // }, [allMedia, btnDisabled]);

  const formik = useFormik({
    initialValues: {
      storeProductName: '',
      storeProductLocation: '',
      storeProductCategory: '',
      storeProductSubCategory: '',
      storeProductDescription: '',
      storeProductItemUnit: '',
      storeProductQuality: '',
      storeProductPrice: '',
      storeProductProcessTime: '',
      storeProductDeliveryLocation: '',
      storeProductAcceptReturns: '',
      storeImageOne: '',
      storeImageTwo: '',
      storeImageThree: '',
      storeImageFour: '',
      storeImageFive: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const newVals = {
        user_id: user.id,
        store_id: listStores.storeId,
        ...values
      };
      try {
        dispatch(postAddProductListing(newVals)).then(() => {
          setSubmitting(false);
          navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.STORE}`);
        });
      } catch (error: any) {
        setErrors(error);
      }
    }
  });

  const { setFieldValue, values, errors } = formik;

  const handleFieldChange = (fieldName: string, value: any) => {
    setFieldValue(fieldName, value);
  };

  React.useEffect(() => {
    if (values.storeProductCategory !== '') {
      const filtered = categories.filter((item: any) => item.value === values.storeProductCategory);
      setSelectedCatId(filtered[0].id);
    }
  }, [formik.values.storeProductCategory]);

  const handleSubCategoryFilter = useCallback(
    (value: string) => {
      const filteredCategories = categories.filter((item: any) => item.id === value);
      setSubCategoryData(filteredCategories[0].sub_category);
    },
    [categories]
  );

  useMemo(() => {
    if (selectedCatId) {
      handleSubCategoryFilter(selectedCatId);
    }
  }, [selectedCatId]);

  return (
    <main className={'formwrap'}>
      <div className='storeInit__form-title'>
        <h2>List Products</h2>
        <p>
          Add some media and details about your products. Fill up as best as you can right now. You can also edit
          afterwards.
        </p>
      </div>
      <div className='form-container'>
        <div className='intro-text mb-1'>
          <h5>Product details</h5>
          <span>Tell your buyers all they need to know about this product </span>
        </div>
        <br />
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} autoComplete='off' encType='multipart/form-data'>
            <div className='mb-2'>
              <FormInput
                label={'Product name'}
                name={'storeProductName'}
                type={'text'}
                hasMessage={true}
                placeholder={'Add a simple name buyers can easily understand '}
              />
            </div>
            <div className='mb-2'>
              <FormSelectField
                name='storeProductLocation'
                data={statesNG}
                label='Product location'
                placeholder={'Select a location'}
              />
            </div>

            <Stack direction={'column'} width={'100%'} mb={2}>
              <FormSelectField
                name={'storeProductCategory'}
                label={'Product category'}
                data={categories}
                placeholder={'Select a category'}
              />
              <FormSelectField
                name={'storeProductSubCategory'}
                label={'Sub category'}
                data={subCategoryData}
                placeholder={'Select a sub category '}
              />
            </Stack>

            <div className='mb-2'>
              <FormInput
                label={'Description'}
                name={'storeProductDescription'}
                as='textarea'
                rows={6}
                hasMessage={true}
                cols={60}
                placeholder={'Describe this product '}
              />
            </div>
            <div className='intro-text mb-1 mb-2'>
              <h5>Add media</h5>
              <span>You can upload up to 4 images and 1 video so that buyers can see enough details </span>
            </div>
            <div className='product-upload'>
              <UploadProductFile
                mimeType={'image'}
                file={values.storeImageOne}
                maxFiles={1}
                accept={'image'}
                onDrop={(acceptedFiles: any) => {
                  handleFieldChange('storeImageOne', acceptedFiles[0]);
                }}
              />
              <UploadProductFile
                mimeType={'image'}
                file={values.storeImageTwo}
                maxFiles={1}
                accept={'image'}
                onDrop={(acceptedFiles: any) => {
                  handleFieldChange('storeImageTwo', acceptedFiles[0]);
                }}
              />
              <UploadProductFile
                mimeType={'image'}
                file={values.storeImageThree}
                maxFiles={1}
                accept={'image'}
                onDrop={(acceptedFiles: any) => {
                  handleFieldChange('storeImageThree', acceptedFiles[0]);
                }}
              />
              <UploadProductFile
                mimeType={'image'}
                file={values.storeImageFour}
                maxFiles={1}
                accept={'image'}
                onDrop={(acceptedFiles: any) => {
                  handleFieldChange('storeImageFour', acceptedFiles[0]);
                }}
              />
              <UploadProductFile
                mimeType={'image'}
                file={values.storeImageFive}
                accept={'image'}
                maxFiles={1}
                onDrop={(acceptedFiles: any) => {
                  handleFieldChange('storeImageFive', acceptedFiles[0]);
                }}
              />
            </div>
            <div className='inventory-form mt-2 '>
              <div className='intro-text mb-1 mb-2'>
                <h5>Inventory and Pricing</h5>
                <span>Add the quantity and pricing of your product </span>
              </div>
              <div className='mb-1 flexView items-field'>
                <div className='selector'>
                  <SelectorAffixable
                    label={'Item unit'}
                    name={'storeProductItemUnit'}
                    placeholder={'Select an item unit'}
                    items={itemUnits}
                    actionText={'Add new unit'}
                    inputPlaceholder={'Add a new unit'}
                    buttonText={`Add Unit`}
                    inputLabel={'New unit'}
                  />
                </div>
                <div className='ml-1'>
                  <FormInput
                    label={'Quantity'}
                    name={'storeProductQuality'}
                    type={'number'}
                    hasMessage={true}
                    placeholder={'Enter a number'}
                  />
                </div>
              </div>
              <div className='mb-2'>
                <FormInputWithIndicator
                  label={'Price'}
                  name={'storeProductPrice'}
                  indicator={formik.values.storeProductItemUnit}
                  hasMessage={true}
                />
              </div>
            </div>
            <div className='delivery-form mt-0'>
              <div className='intro-text mb-1 mb-2'>
                <h5>Delivery details and Policies</h5>
                <span>Set clear delivery details for this product </span>
              </div>
              <div className='mb-2'>
                <SelectorAffixable
                  label={'Processing time'}
                  name={'storeProductProcessTime'}
                  placeholder={'How long does it take to prepare an order? Select a processing time.'}
                  items={processingTime}
                  actionText={'Add custom processing time'}
                  inputPlaceholder={'How many days'}
                  buttonText={`Add time`}
                  inputLabel={'Processing time'}
                />
              </div>
              <div className='mb-2'>
                <FormSelectField
                  name='storeProductDeliveryLocation'
                  data={nationwideNG}
                  label='Delivery location(s)'
                  placeholder={'Search for a location'}
                />
              </div>
              {/* <div className='mb-2'>
                <Button
                  size='small'
                  startIcon={<HiPlus fill={'#66C61C'} />}
                  onClick={() => console.log('clicked')}
                  sx={actionButtonStyle}
                >
                  Add new delivery location
                </Button>
              </div> */}
              <div className='mb-2'>
                <FormSelectField
                  name='storeProductAcceptReturns'
                  data={returnsData}
                  label='Do you accept returns?'
                  placeholder={'Select an option'}
                />
              </div>
            </div>
            <div className='footer-button'>
              <SimpleButton label={'List Product'} />
            </div>
          </Form>
        </FormikProvider>
      </div>
    </main>
  );
};

export default StallListProducts;
