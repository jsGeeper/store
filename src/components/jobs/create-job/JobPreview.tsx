import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Loader } from '@gogeepernpm/storybook/lib';
import {
  Badge,
  BadgeText,
  FlexEndStack,
  StepperCardSubtitle,
  StepperCardTitle,
  StepperFormHeader,
  StyledInfoDesc,
  StyledInfoTitle
} from '../../../container/jobs/jobs.reusables';
import { SimpleButton } from '../../button/SimpleButton';
import { useDispatch, useSelector } from 'react-redux';
import { onPreviousStep, submitJob } from '../../../redux/slice/jobs/jobs.slice';
import { IRootReducerState } from '../../../redux/IRootReducer';
import formatPrice from '../../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../../hooks/useSnackbar';

export const JobPreview: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createJob, loading, error } = useSelector((state: IRootReducerState) => state.jobs);
  const { jobStageOne, jobStageTwo, jobStageThree } = createJob;
  const { showSnackbar } = useSnackbar();

  const handlePostJob = async () => {
    dispatch(submitJob(createJob));

    if (error) {
      showSnackbar('Something went wrong', '', 'error', null, null);
    }

    if (!error && !loading) {
      showSnackbar('Job posted successfully', '', 'success', null, null);
      // navigate('/dashboard/jobs');
    }
  };
  return (
    <Box>
      {loading && <Loader loading={loading} />}
      <StepperFormHeader sx={{ marginBottom: '40px' }}>
        <StepperCardTitle>Job preview</StepperCardTitle>
        <StepperCardSubtitle>This is how agric experts will see your job post</StepperCardSubtitle>
      </StepperFormHeader>

      <Box>
        <StepperCardTitle>{jobStageOne.title}</StepperCardTitle>

        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexWrap={'wrap'}
          marginY={3}
        >
          <Box marginY={1}>
            <StyledInfoTitle gutterBottom>duration</StyledInfoTitle>
            <StyledInfoDesc>{jobStageTwo.duration}</StyledInfoDesc>
          </Box>
          <Box marginY={1}>
            <StyledInfoTitle gutterBottom>project type</StyledInfoTitle>
            <StyledInfoDesc>{jobStageTwo.location}</StyledInfoDesc>
          </Box>
          <Box marginY={1}>
            <StyledInfoTitle gutterBottom>project rate</StyledInfoTitle>
            <StyledInfoDesc>
              {jobStageThree.job_budget === 'yes'
                ? `${formatPrice(parseInt(jobStageThree.job_budget_amount))}/Mo`
                : '-'}
            </StyledInfoDesc>
          </Box>
          <Box marginY={1}>
            <StyledInfoTitle gutterBottom>date posted</StyledInfoTitle>
            <StyledInfoDesc>{jobStageThree.createdAt}</StyledInfoDesc>
          </Box>
        </Stack>

        <Box mb={3}>
          <Typography color={'#101828'} fontWeight={600} fontSize={18} mb={2}>
            Job details
          </Typography>

          <Typography color={'#475467'} fontWeight={400} fontSize={16}>
            {jobStageOne.description}
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography color={'#101828'} fontWeight={600} fontSize={18} mb={2}>
            Media
          </Typography>

          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexWrap={'wrap'}
            marginTop={2}
          >
            {jobStageOne.images.map((image: string) => (
              <Box
                key={image}
                component={'img'}
                width={120}
                height={120}
                sx={{ objectFit: 'cover', borderRadius: '8px' }}
                src={image}
              />
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography color={'#101828'} fontWeight={600} fontSize={18} mb={2}>
            Tags
          </Typography>

          <Stack
            direction={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            flexWrap={'wrap'}
            spacing={1}
            marginTop={2}
          >
            {jobStageOne.tags.split(',').map((tag: string) => (
              <Badge key={tag}>
                <BadgeText>{tag}</BadgeText>
              </Badge>
            ))}
          </Stack>
        </Box>

        <FlexEndStack marginTop={3}>
          <Box mr={2}>
            <SimpleButton
              label={'Cancel'}
              type='button'
              className='btn-outline-grey'
              onClick={() => dispatch(onPreviousStep())}
            />
          </Box>
          <Box>
            <SimpleButton label={'Post job'} onClick={handlePostJob} />
          </Box>
        </FlexEndStack>
      </Box>
    </Box>
  );
};
