import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { HiPlus } from 'react-icons/hi';
import FormInput from '../../form/FormInput';
import FormSelectField from '../../form/FormSelectField';
import statesNG from '../../../utils/states';
import { UploadProductFile } from '../../uploads';
import { SelectorAffixable } from '../../form';
import FormInputWithIndicator from '../../form/FormInputWithIndicator';
import nationwideNG from '../../../utils/nationWide';
import { SimpleButton } from '../../button/SimpleButton';

const validationSchema = Yup.object().shape({
  storeProductName: Yup.string().required('Product Name is required'),
  storeProductLocation: Yup.string().required('Product Location is required'),
  storeProductCategory: Yup.string().required('Select a product category'),
  storeProductSubCategory: Yup.string().required('Select a product sub-category'),
  storeProductDescription: Yup.string().required('Product Description is required'),
  storeProductItem: Yup.string().required('Product Item unit is required'),
  storeProductQuantity: Yup.string().required('Enter product quantity'),
  storeProductPrice: Yup.string().required('Price is required'),
  storeProductProcessTime: Yup.string().required('Process Time is required'),
  storeProductDeliveryLocation: Yup.string().required('Delivery Location is required'),
  storeProductAcceptReturns: Yup.string().required('Accept Returns is required')
});

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

const returnsData = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];

const ProductDetails = () => {
  const [img1, setImg1] = React.useState<any>(null);
  const [img2, setImg2] = React.useState<any>(null);
  const [img3, setImg3] = React.useState<any>(null);
  const [img4, setImg4] = React.useState<any>(null);
  const [video, setVideo] = React.useState<any>(null);
  const [allMedia, setAllMedia] = React.useState<any>([]);

  const handleDropSingleFile = (acceptedFiles: any, setFile: any) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile({
        ...file,
        preview: URL.createObjectURL(file),
        file: file
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      storeProductName: 'default title',
      storeProductLocation: '',
      storeProductCategory: '',
      storeProductSubCategory: '',
      storeProductDescription: '',
      storeProductItem: '',
      storeProductQuantity: '',
      storeProductPrice: '',
      storeProductProcessTime: '',
      storeProductDeliveryLocation: '',
      storeProductAcceptReturns: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <aside id='product-tab'>
      <div className='intro-text mb-2'>
        <h5>Product details</h5>
        <span>Tell your buyers all they need to know about this product </span>
      </div>
      <div className='form-container'>
        <FormikProvider value={formik}>
          <Form autoComplete='off' onSubmit={formik.handleSubmit}>
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
            <div className='mb-2 flexView'>
              <div className={'selector'}>
                <FormSelectField
                  name={'storeProductCategory'}
                  label={'Product category'}
                  data={[]}
                  placeholder={'Select a category'}
                />
              </div>
              <div className='selector ml-1'>
                <FormSelectField
                  name={'storeProductSubCategory'}
                  label={'Sub category'}
                  data={[]}
                  placeholder={'Select a sub category '}
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
            <div className='intro-text mb-1 mt-1'>
              <h5>Add media</h5>
              <span>You can upload up to 4 images and 1 video so that buyers can see enough details </span>
            </div>
            <div className='product-upload'>
              <UploadProductFile
                mimeType={'video'}
                file={video}
                maxFiles={1}
                accept={'video'}
                width={'144.6px'}
                height={'145px'}
                onDrop={(acceptedFiles: any) => {
                  handleDropSingleFile(acceptedFiles, setVideo);
                }}
              />
              <UploadProductFile
                mimeType={'image'}
                file={img1}
                maxFiles={1}
                width={'144.6px'}
                height={'145px'}
                accept={'image'}
                onDrop={(acceptedFiles: any) => {
                  handleDropSingleFile(acceptedFiles, setImg1);
                }}
              />
              <UploadProductFile
                mimeType={'image'}
                file={img2}
                maxFiles={1}
                width={'144.6px'}
                height={'145px'}
                accept={'image'}
                onDrop={(acceptedFiles: any) => {
                  handleDropSingleFile(acceptedFiles, setImg2);
                }}
              />
              <UploadProductFile
                mimeType={'image'}
                file={img3}
                maxFiles={1}
                width={'144.6px'}
                height={'145px'}
                accept={'image'}
                onDrop={(acceptedFiles: any) => {
                  handleDropSingleFile(acceptedFiles, setImg3);
                }}
              />
              <UploadProductFile
                mimeType={'image'}
                file={img4}
                width={'144.6px'}
                height={'145px'}
                accept={'image'}
                maxFiles={1}
                onDrop={(acceptedFiles: any) => {
                  handleDropSingleFile(acceptedFiles, setImg4);
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
                    items={[]}
                    actionText={'Add new unit'}
                    inputPlaceholder={'Add a new unit'}
                    buttonText={`Add Unit`}
                    inputLabel={'New unit'}
                  />
                </div>
                <div className='ml-1 flex-1'>
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
                  label={'Price'}
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
                  items={[]}
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
              <div className='mb-2'>
                <Button
                  size='small'
                  startIcon={<HiPlus fill={'#66C61C'} />}
                  onClick={() => console.log('clicked')}
                  sx={actionButtonStyle}
                >
                  Add new delivery location
                </Button>
              </div>
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
              <SimpleButton label={'Save Changes'} type={'submit'} />
            </div>
          </Form>
        </FormikProvider>
      </div>
    </aside>
  );
};

export default ProductDetails;
