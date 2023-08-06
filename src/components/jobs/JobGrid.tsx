import { Box, Grid, Stack, IconButton, Typography, styled, Divider, Popover, List, ListItem } from '@mui/material';
import { FiMoreHorizontal } from 'react-icons/fi';
import moment from 'moment';
import _ from 'lodash';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from '../../hooks/useSnackbar';
import { DeleteModal } from '../modals/DeleteModal';
import { MarkAsCompleteModal } from '../modals/MarkAsCompleteModal';
import { SocialShareModal } from '../modals/SocialShareModal';
import { markJobAsArchive } from '../../redux/slice/jobs/jobs.slice';

type Type = 'job' | 'explore' | 'my-job';

interface JobGridProps {
  data: any[];
  type?: Type;
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
  borderRadius: '16px',
  margin: '5px 0'
});

const BadgeText = styled(Typography)({
  color: '#3B7C0F',
  textAlign: 'center',
  fontWeight: 500,
  fontSize: 14,
  textTransform: 'capitalize'
});

const StyledListItem = styled(ListItem)({
  color: '#344054',
  fontWeight: 400,
  fontSize: 14,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f2f3f3'
  }
});

export const JobGrid: React.FC<JobGridProps> = ({ data, type = 'job' }: JobGridProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [markAsCompleteDialog, setMarkAsCompleteDialog] = React.useState(false);
  const [openSocialShare, setOpenSocialShare] = React.useState(false);
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };

  const handleMarkAsCompleteDialogOpen = () => {
    setMarkAsCompleteDialog(true);
    handleClose();
  };

  const handleMarkAsCompleteDialogClose = () => {
    setMarkAsCompleteDialog(false);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleSetToArchive = (id: string) => {
    dispatch(markJobAsArchive(id));
    handleClose();
    showSnackbar(
      'Job post has been archived.',
      'Experts would not be able to see this job anymore',
      'success',
      () => navigate('/dashboard/jobs'),
      'View archived jobs'
    );
  };

  const handleSocialShareDialogOpen = () => {
    setOpenSocialShare(true);
    handleClose();
  };

  const handleSocialShareDialogClose = () => {
    setOpenSocialShare(false);
  };

  const handleSocialShare = () => {
    console.log('share');
    handleSocialShareDialogClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? `job-item-popover` : undefined;

  const navigatePage = (url: string) => navigate(url);

  const PopOverList = ({ jobID, job }: { jobID: string; job: any }) => {
    const { showSnackbar } = useSnackbar();

    return (
      <>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          sx={{
            '& .MuiPopover-paper': {
              boxShadow: 'none',
              border: '1px solid #f2f3f3'
            }
          }}
        >
          <List>
            <StyledListItem onClick={() => navigatePage(`/dashboard/jobs/edit/${jobID}`)}>Edit job</StyledListItem>
            <StyledListItem onClick={() => handleSetToArchive(jobID)}>Archive job</StyledListItem>
            <StyledListItem onClick={handleMarkAsCompleteDialogOpen}>Mark as complete</StyledListItem>
            <StyledListItem onClick={handleSocialShareDialogOpen}>Share job</StyledListItem>
            <StyledListItem sx={{ color: '#B42318' }} onClick={handleDeleteDialogOpen}>
              Delete job{' '}
            </StyledListItem>
          </List>
        </Popover>
        <DeleteModal open={openDeleteDialog} onClose={handleDeleteDialogClose} jobId={jobID} />
        <MarkAsCompleteModal open={markAsCompleteDialog} onClose={handleMarkAsCompleteDialogClose} jobId={jobID} />
        <SocialShareModal
          open={openSocialShare}
          onClose={handleSocialShareDialogClose}
          onSubmit={handleSocialShare}
          jobId={jobID}
          url={`https://store.gogeeper.com/dashboard/jobs/${jobID}`}
          quote={job.description}
          title={job.title}
        />
      </>
    );
  };

  return (
    <Box paddingY={3}>
      <Grid container spacing={3}>
        {data &&
          data.map((item) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={item.id}>
              <Box bgcolor={'#fff'} borderRadius={'8px'} border={'1px solid #f2f3f3'} padding={'24px'}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={1}>
                  <Stack flexDirection={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                    <Typography
                      variant={'body2'}
                      fontSize={14}
                      textTransform={'capitalize'}
                      fontWeight={400}
                      color={'#667085'}
                      gutterBottom
                    >
                      {item.storeOwnerName}
                    </Typography>

                    <Typography
                      fontSize={18}
                      component={Link}
                      to={
                        type === 'job'
                          ? `/dashboard/jobs/${item.id}`
                          : type === 'explore'
                          ? `/dashboard/explore/job/${item.id}`
                          : `/dashboard/my-jobs/${item.id}`
                      }
                      sx={{ textDecoration: 'none' }}
                      fontWeight={'bold'}
                      fontFamily={'Inter'}
                      variant={'h3'}
                      color={'#101828'}
                    >
                      {_.truncate(item.title, { length: 30 })}
                    </Typography>
                  </Stack>
                  <Box alignSelf={'flex-start'}>
                    <IconButton onClick={handleClick}>
                      <FiMoreHorizontal color={'#475467'} size={20} />
                    </IconButton>
                    <PopOverList jobID={item.id} job={item} />
                  </Box>
                </Stack>

                <Stack
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexWrap={'wrap'}
                  marginY={3}
                >
                  <Box marginY={1}>
                    <StyledInfoTitle gutterBottom>duration</StyledInfoTitle>
                    <StyledInfoDesc>{item.duration}</StyledInfoDesc>
                  </Box>
                  <Box marginY={1}>
                    <StyledInfoTitle gutterBottom>project type</StyledInfoTitle>
                    <StyledInfoDesc>{item.location}</StyledInfoDesc>
                  </Box>
                  <Box marginY={1}>
                    <StyledInfoTitle gutterBottom>project rate</StyledInfoTitle>
                    <StyledInfoDesc>
                      {item.budget_amount} {item.rangePeriod}
                    </StyledInfoDesc>
                  </Box>
                  <Box marginY={1}>
                    <StyledInfoTitle gutterBottom>date posted</StyledInfoTitle>
                    <StyledInfoDesc>{moment(item.created_at).format('MMM d, YYYY')}</StyledInfoDesc>
                  </Box>
                </Stack>
                <Divider
                  sx={{
                    borderColor: '#f2f3f3',
                    margin: '5px 0'
                  }}
                />
                <Stack
                  direction={'row'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                  flexWrap={'wrap'}
                  spacing={1}
                  marginTop={2}
                >
                  {item?.tags &&
                    item?.tags.split(',').map((tag: string) => (
                      <Badge key={tag}>
                        <BadgeText>{tag}</BadgeText>
                      </Badge>
                    ))}
                </Stack>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
