import { Box, Typography, Stack, styled } from '@mui/material';
import React from 'react';
import moment from 'moment';

interface IProps {
  data?: any;
}

const StyledInfoTitle = styled(Typography)({
  color: '#98A2B3',
  fontWeight: 400,
  fontSize: '12px',
  textTransform: 'capitalize'
});

const StyledInfoDesc = styled(Typography)({
  color: '#344054',
  fontWeight: 500,
  fontSize: 16
});

const Badge = styled(Box)({
  backgroundColor: '#F3FEE7',
  padding: '2px 10px',
  borderRadius: '16px'
});

const BadgeText = styled(Typography)({
  color: '#3B7C0F',
  textAlign: 'center',
  fontWeight: 500,
  fontSize: 14,
  textTransform: 'capitalize'
});

export const JobInformation: React.FC<IProps> = ({ data }: IProps) => {
  return (
    <Box width={'100%'} maxWidth={555}>
      {data && (
        <>
          <Typography color={'#101828'} fontWeight={700} fontSize={20} mb={2}>
            {data?.title}
          </Typography>

          <Stack
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexWrap={'wrap'}
            marginY={3}
          >
            <Box marginY={1}>
              <StyledInfoTitle gutterBottom>duration</StyledInfoTitle>
              <StyledInfoDesc>{data.duration}</StyledInfoDesc>
            </Box>
            <Box marginY={1}>
              <StyledInfoTitle gutterBottom>project type</StyledInfoTitle>
              <StyledInfoDesc>{data.location}</StyledInfoDesc>
            </Box>
            <Box marginY={1}>
              <StyledInfoTitle gutterBottom>project rate</StyledInfoTitle>
              <StyledInfoDesc>{data.budget_amount}/Mo</StyledInfoDesc>
            </Box>
            <Box marginY={1}>
              <StyledInfoTitle gutterBottom>date posted</StyledInfoTitle>
              <StyledInfoDesc>{moment(data.created_at).format('MMMM d, YYYY')}</StyledInfoDesc>
            </Box>
          </Stack>

          <Box mb={3}>
            <Typography color={'#101828'} fontWeight={600} fontSize={18} mb={2}>
              Job details
            </Typography>

            <Typography color={'#475467'} fontWeight={400} fontSize={16}>
              {data?.description}
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
              {data.jobImageOne && (
                <Box
                  component={'img'}
                  width={120}
                  height={120}
                  sx={{ objectFit: 'cover', borderRadius: '8px' }}
                  src={data?.jobImageOne}
                />
              )}
              {data?.jobImageTwo && (
                <Box
                  component={'img'}
                  width={120}
                  height={120}
                  sx={{ objectFit: 'cover', borderRadius: '8px' }}
                  src={data?.jobImageTwo}
                />
              )}
              {data?.jobImageThree && (
                <Box
                  component={'img'}
                  width={120}
                  height={120}
                  sx={{ objectFit: 'cover', borderRadius: '8px' }}
                  src={data?.jobImageThree}
                />
              )}
              {data?.jobImageFour && (
                <Box
                  component={'img'}
                  width={120}
                  height={120}
                  sx={{ objectFit: 'cover', borderRadius: '8px' }}
                  src={data?.jobImageFour}
                />
              )}
              {data?.jobImageFive && (
                <Box
                  component={'img'}
                  width={120}
                  height={120}
                  sx={{ objectFit: 'cover', borderRadius: '8px' }}
                  src={data?.jobImageFive}
                />
              )}
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
              {data.tags &&
                data?.tags.split(',').map((tag: string) => (
                  <Badge key={tag}>
                    <BadgeText>{tag}</BadgeText>
                  </Badge>
                ))}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};
