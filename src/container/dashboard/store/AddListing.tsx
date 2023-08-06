import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { HiPlus } from 'react-icons/hi';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { AppWrapper } from '../../../components/layouts/app-wrapper';
import { getStallCategories, postAddProductListing } from '../../../redux/slice/stall/stallActions';
import { PATH_DASHBOARD, PATH_MAIN } from '../../../router/pages';
import FormInput from '../../../components/form/FormInput';
import FormSelectField from '../../../components/form/FormSelectField';
import statesNG from '../../../utils/states';
import { IRootReducerState } from '../../../redux/IRootReducer';
import { UploadProductFile } from '../../../components/uploads';
import { SelectorAffixable } from '../../../components/form';
import FormInputWithIndicator from '../../../components/form/FormInputWithIndicator';
import nationwideNG from '../../../utils/nationWide';
import { Button } from '@mui/material';
import { SimpleButton } from '../../../components/button/SimpleButton';
import useGetCategories from '../../../react-query/hooks/useGetCategories';
import useSubCategory from '../../../react-query/hooks/useSubCategory';
import useUnit from '../../../react-query/hooks/useUnit';
import useListProducts, { ProductList } from '../../../react-query/hooks/useListProducts';
import FormData from 'form-data';
import ErrorNotification from '../../../react-query/Notification/ErrorNotification';
import SuccessNotification from '../../../react-query/Notification/SuccessNotification';

const returnsData = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];

const processingTime = [
  { value: 'less than 1 day', label: 'less than 1 day' },
  { value: '1 - 2 days', label: '1 - 2 days' },
  { value: '2 - 3 days', label: '2 - 3 days' },
  { value: '3 - 4 days', label: '3 - 4 days' }
];

const itemUnit = [
  { value: 'Bags', label: 'Bags' },
  { value: 'Baskets', label: 'Baskets' },
  { value: 'Drums', label: 'Drums' },
  { value: 'Packs', label: 'Packs' },
  { value: 'Kilograms', label: 'Kilograms' },
  { value: 'Litres', label: 'Litres' },
  { value: 'Meters', label: 'Meters' },
  { value: 'Metric Tons', label: 'Metric Tons' }
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
  storeProductCategory: Yup.string().required('Select a product category'),
  storeProductSubCategory: Yup.string().required('Select a product sub-category'),
  storeProductDescription: Yup.string().required('Product Description is required'),
  storeProductItem: Yup.string().required('Product Item unit is required'),
  storeProductQuantity: Yup.string().required('Enter product quantity'),
  storeProductPrice: Yup.string(),
  salePrice: Yup.string().required('Sale price is required'),
  storeProductProcessTime: Yup.string().required('Process Time is required'),
  storeProductAcceptReturns: Yup.string().required('Accept Returns is required'),
  storeImageOne: Yup.string(),
  storeImageTwo: Yup.string(),
  storeImageThree: Yup.string(),
  storeImageFour: Yup.string(),
  storeImageFive: Yup.string()
});

const AddListing = () => {
  // const dispatch = useDispatch();
  // get akk categories
  const [selectedCategories, setSelectedCategories] = useState<number>(0);
  const { data: categories } = useGetCategories();
  const { data: subCategories, refetch } = useSubCategory(selectedCategories);
  const { data: units } = useUnit();
  const {
    mutate,
    isLoading,
    error,
    data: listProdData
  } = useListProducts({
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  // this is added by sam. to refetch the subcategories when the category is selected
  useEffect(() => {
    if (selectedCategories) {
      refetch();
    }
  }, [selectedCategories]);
  // const { getCategories } = useSelector((state: IRootReducerState) => state.stall);

  // const [categories, setCategories] = React.useState<any>([]);

  // React.useEffect(() => {
  //   dispatch(getStallCategories());
  // }, []);

  // React.useEffect(() => {
  //   if (getCategories) {
  //     setCategories(getCategories);
  //   }
  // }, [getCategories]);

  const formik = useFormik({
    initialValues: {
      storeProductName: '',
      storeProductCategory: '',
      storeProductSubCategory: '',
      storeProductDescription: '',
      storeProductItem: '',
      storeProductQuantity: '',
      storeProductPrice: '',
      salePrice: '',
      storeProductProcessTime: '',
      storeProductAcceptReturns: '',
      storeImageOne: '',
      storeImageTwo: '',
      storeImageThree: '',
      storeImageFour: '',
      storeImageFive: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      // Check if at least one image is selected
      if (
        !values.storeImageOne &&
        !values.storeImageTwo &&
        !values.storeImageThree &&
        !values.storeImageFour &&
        !values.storeImageFive
      ) {
        setErrors({ storeImageOne: 'Please select at least one image' });
        return;
      }

      const formData = new FormData() as any;
      formData.append('productName', values.storeProductName);
      formData.append('productDescription', values.storeProductDescription);
      formData.append('salePrice', parseFloat(values.salePrice));
      formData.append('category', values.storeProductCategory);
      formData.append('subCategory', values.storeProductSubCategory);
      formData.append('unit', units?.find((x) => x.value === values.storeProductItem)?.['id']);
      formData.append('processingTime', values.storeProductProcessTime);
      formData.append('inStock', values.storeProductQuantity);
      formData.append('acceptReturn', values.storeProductAcceptReturns === 'yes');
      formData.append('returnPolicy', 'No return policy at the moment');

      // Append images if they exist
      if (values.storeImageOne) {
        formData.append('product_image', values.storeImageOne);
      }
      if (values.storeImageTwo) {
        formData.append('product_image', values.storeImageTwo);
      }
      if (values.storeImageThree) {
        formData.append('product_image', values.storeImageThree);
      }
      if (values.storeImageFour) {
        formData.append('product_image', values.storeImageFour);
      }
      if (values.storeImageFive) {
        formData.append('product_image', values.storeImageFive);
      }
      console.log(values.storeImageOne);

      // append regular price if it exists
      if (values.storeProductPrice) {
        formData.append('regularPrice', parseFloat(values.storeProductPrice));
        mutate(formData);
        return;
      }
      mutate(formData);
    }
  });

  const { setFieldValue, values } = formik;

  const handleFieldChange = (fieldName: string, value: any) => {
    setFieldValue(fieldName, value);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>List Product | Go-Geeper</title>
      </Helmet>
      <main id={'addListing'}>
        <AppWrapper title={'Store / List Product'} isLoading={isLoading}>
          <main className='listingWrapper'>
            <div className='listingTitle'>
              <h3 className='title'>List Products</h3>
              <p className='subtitle'>
                Add some media and details about your products. Fill up as best as you can right now.
              </p>
              <p className='subtitle'>You can also edit afterwards.</p>
            </div>
            {error?.response.data.message && (
              <ErrorNotification>{error?.response.data.message || error?.message}</ErrorNotification>
            )}
            {listProdData?.success && (
              <SuccessNotification>
                <p>
                  The product <strong>{listProdData?.data?.product.productName}</strong> has been successfully
                  created.You can now manage this product in your dashboard.
                </p>
              </SuccessNotification>
            )}
            <br />
            <div className='form-container'>
              <div className='intro-text mb-2'>
                <h5>Product details</h5>
                <span>Tell your buyers all they need to know about this product </span>
              </div>

              <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit} autoComplete={'off'} encType='multipart/form-data'>
                  <div className='mb-2'>
                    <FormInput
                      label={'Product name'}
                      name={'storeProductName'}
                      type={'text'}
                      hasMessage={true}
                      placeholder={'Add a simple name buyers can easily understand '}
                    />
                  </div>
                  {/* <div className='mb-2'>
                    <FormSelectField
                      name='storeProductLocation'
                      data={statesNG}
                      label='Product location'
                      placeholder={'Select a location'}
                    />
                  </div> */}

                  <div className='mb-0 flexView'>
                    <div className={'selector'}>
                      <FormSelectField
                        name={'storeProductCategory'}
                        label={'Product category'}
                        data={categories}
                        placeholder={'Select a category'}
                        handleFun={setSelectedCategories}
                      />
                    </div>
                    <div className='selector ml-1'>
                      <FormSelectField
                        name={'storeProductSubCategory'}
                        label={'Sub category'}
                        data={subCategories}
                        placeholder={'Select a sub category '}
                        key={selectedCategories}
                      />
                    </div>
                  </div>
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

                  <div className='intro-text mb-2'>
                    <h5>Add media</h5>
                    <span>You can upload up to 4 images and 1 video so that buyers can see enough details </span>
                  </div>
                  <div className='product-upload'>
                    <UploadProductFile
                      mimeType={'image'}
                      file={values.storeImageOne}
                      maxFiles={1}
                      width={'144.6px'}
                      height={'145px'}
                      accept={'image'}
                      onDrop={(acceptedFiles: any) => {
                        handleFieldChange('storeImageOne', acceptedFiles[0]);
                      }}
                    />
                    <UploadProductFile
                      mimeType={'image'}
                      file={values.storeImageTwo}
                      maxFiles={1}
                      width={'144.6px'}
                      height={'145px'}
                      accept={'image'}
                      onDrop={(acceptedFiles: any) => {
                        handleFieldChange('storeImageTwo', acceptedFiles[0]);
                      }}
                    />
                    <UploadProductFile
                      mimeType={'image'}
                      file={values.storeImageThree}
                      maxFiles={1}
                      width={'144.6px'}
                      height={'145px'}
                      accept={'image'}
                      onDrop={(acceptedFiles: any) => {
                        handleFieldChange('storeImageThree', acceptedFiles[0]);
                      }}
                    />
                    <UploadProductFile
                      mimeType={'image'}
                      file={values.storeImageFour}
                      width={'144.6px'}
                      height={'145px'}
                      accept={'image'}
                      maxFiles={1}
                      onDrop={(acceptedFiles: any) => {
                        handleFieldChange('storeImageFour', acceptedFiles[0]);
                      }}
                    />
                    <UploadProductFile
                      mimeType={'image'}
                      file={values.storeImageFive}
                      maxFiles={1}
                      accept={'image'}
                      width={'144.6px'}
                      height={'145px'}
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
                          name={'storeProductItem'}
                          placeholder={'Select an item unit'}
                          items={units}
                          actionText={'Add new unit'}
                          inputPlaceholder={'Add a new unit'}
                          buttonText={`Add Unit`}
                          inputLabel={'New unit'}
                        />
                      </div>
                      <div className='ml-1'>
                        <FormInput
                          label={'Quantity'}
                          name={'storeProductQuantity'}
                          type={'number'}
                          hasMessage={true}
                          placeholder={'Enter a number'}
                        />
                      </div>
                    </div>
                    <div className='mb-2'>
                      <FormInputWithIndicator
                        label={'Sales Price'}
                        name={'salePrice'}
                        indicator={formik.values.storeProductItem}
                        hasMessage={true}
                      />
                    </div>
                    <div className='mb-2'>
                      <FormInputWithIndicator
                        label={'Regular Price'}
                        name={'storeProductPrice'}
                        indicator={formik.values.storeProductItem}
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
                    {/* <div className='mb-2'>
                      <FormSelectField
                        name='storeProductDeliveryLocation'
                        data={nationwideNG}
                        label='Delivery location(s)'
                        placeholder={'Search for a location'}
                      />
                    </div> */}
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
                    <SimpleButton label={'List Product'} type={'submit'} />
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </main>
        </AppWrapper>
      </main>
    </React.Fragment>
  );
};

export default AddListing;
