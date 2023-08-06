import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { FormikProvider, useFormik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@gogeepernpm/storybook/lib';
import { uploadFile } from 'react-s3';
import { aws_config } from '../../../utils/aws_config';
import {
  DescriptionRightText,
  FlexEndStack,
  StepperCardSubtitle,
  StepperCardTitle,
  StepperFormHeader,
  StepperFormProps,
  StepperFormStack
} from '../../../container/jobs/jobs.reusables';
import FormInput from '../../form/FormInput';
import { UploadMultiFile } from '../../uploads';
import { SimpleButton } from '../../button/SimpleButton';
import { useDispatch, useSelector } from 'react-redux';
import { initStageOne } from '../../../redux/slice/jobs/jobs.slice';
import { IRootReducerState } from '../../../redux/IRootReducer';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required').max(500, 'Description exceeds 500 characters'),
  tags: yup.string().required('Tags are required'),
  images: yup.array().min(3, 'Images is required').max(5, 'Images exceeds 5')
});

export const JobDescription: React.FC<StepperFormProps> = ({ onNext }: StepperFormProps) => {
  const [file, setFile] = useState<any>(null);
  const [initiatedBefore, setInitiatedBefore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createJob } = useSelector((state: IRootReducerState) => state.jobs);

  useEffect(() => {
    if (createJob.jobStageOne) {
      const { title, description, tags, images } = createJob.jobStageOne;
      formik.setValues({
        title,
        description,
        tags,
        images: images || []
      });

      setInitiatedBefore(true);
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: '',
      description: '',
      tags: '',
      images: []
    },
    validationSchema,
    onSubmit: async (val, { setSubmitting }) => {
      if (initiatedBefore && createJob.jobStageOne.images === val.images) {
        return onNext();
      } else {
        setIsLoading(true);
        const images = await Promise.all(
          val.images.map(async (image: any) => {
            const data = await uploadFile(image, { ...aws_config, dirName: 'jobs' });
            return data.location;
          })
        );
        setIsLoading(false);
        dispatch(initStageOne({ ...val, images }));
      }

      setSubmitting(false);
      onNext();
    }
  });

  const { handleSubmit, setFieldValue, values, touched, errors } = formik;
  const descriptionCount = formik.values.description.length;

  const handleDrop = useCallback(
    (acceptedFiles: any[]) => {
      setFieldValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  const handleRemove = (file: any) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  return (
    <Box>
      {isLoading && <Loader loading={isLoading} />}
      <StepperFormHeader>
        <StepperCardTitle gutterBottom>Job description</StepperCardTitle>
        <StepperCardSubtitle>
          Help agric experts understand your job by giving a detailed description.
        </StepperCardSubtitle>
      </StepperFormHeader>

      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <StepperFormStack>
            <FormInput name={'title'} label='Title' hasMessage placeholder='Give your job a detailed title' />
            <Box>
              <FormInput
                as='textarea'
                name='description'
                rows={5}
                cols={50}
                label={'Description'}
                hasMessage={true}
                placeholder={'Give details about the job '}
              />
              <DescriptionRightText>{descriptionCount} / 500 characters</DescriptionRightText>
            </Box>
            <Box>
              <FormInput
                name='tags'
                label={'Tags'}
                hasMessage={true}
                placeholder={'Add tags to help more experts to see your gig'}
                pattern={'[a-zA-Z0-9, ]+'}
              />
              <Typography variant='body2' gutterBottom fontSize={'1.4rem'} color='textSecondary' component='p'>
                <span>
                  Examples:{' '}
                  <em
                    className='link-underlined notice-txt'
                    style={{
                      textDecoration: 'none',
                      fontStyle: 'normal'
                    }}
                  >
                    Poultry,Irrigation,Agronomist,Harvesting,Animal Husbandry,.....
                  </em>
                </span>
              </Typography>
            </Box>
            <UploadMultiFile
              showPreview
              maxSize={3145728}
              multiple={true}
              maxFiles={5}
              accept='image/*'
              files={values.images}
              onDrop={handleDrop}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              error={Boolean(touched.images && errors.images)}
            />
            <FlexEndStack marginTop={2}>
              <Box mr={2}>
                <SimpleButton
                  label={'Cancel'}
                  type='button'
                  className='btn-outline-grey'
                  onClick={() => {
                    localStorage.removeItem('job_description');
                    navigate('/dashboard/jobs');
                  }}
                />
              </Box>
              <Box>
                <SimpleButton label={'Save and continue'} />
              </Box>
            </FlexEndStack>
          </StepperFormStack>
        </Form>
      </FormikProvider>
    </Box>
  );
};
