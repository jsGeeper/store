import {
  Box,
  Table,
  TableContainer,
  TableBody,
  Divider,
  TableRow,
  TableCell,
  Avatar,
  Stack,
  Typography,
  styled
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { ApplicantTableHead } from '../table/components/ApplicantTableHead';
import { Pagination } from '../pagination';
import { StarRating } from '../rating';
import { ApplicantmoreIcon } from '../table/components/ApplicantMoreIcon';
import {
  handleAssignApplicant,
  handleDeclineApplicant,
  handleRemoveApplicant
} from '../../redux/slice/jobs/jobs.slice';
import { useSnackbar } from '../../hooks/useSnackbar';

interface IProps {
  applicants: any[];
  handleChangePage: (event: unknown, newPage: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  page: number;
  pageCount: number;
  jobId: any;
}

const TABLE_HEAD = [
  { label: 'Applcant name', align: 'left' },
  { label: 'Title', align: 'left' },
  { label: 'Rating', align: 'left' },
  { label: 'Action', align: 'left' },
  { label: '' }
];

const AssignText = styled(Typography)({
  color: '#027A48',
  fontWeight: 500,
  fontSize: 16,
  cursor: 'pointer'
});

const DeclineText = styled(Typography)({
  color: '#B42318',
  fontWeight: 500,
  fontSize: 16,
  cursor: 'pointer'
});

export const ApplicantTableList: React.FC<IProps> = ({
  applicants,
  handleChangePage,
  onNextPage,
  onPreviousPage,
  page,
  pageCount,
  jobId
}: IProps) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const [isAssigned, setIsAssigned] = React.useState(false);
  const [isDeclined, setIsDeclined] = React.useState(false);
  const [isRemoved, setIsRemoved] = React.useState(false);

  const handleAssign = (applicantId: string, jobId: any) => {
    dispatch(
      handleAssignApplicant({
        applicant_id: applicantId,
        jobId: jobId
      })
    );
    setIsAssigned(true);
  };

  const handleDecline = (applicantId: string, jobId: any) => {
    dispatch(
      handleDeclineApplicant({
        applicant_id: applicantId,
        jobId: jobId
      })
    );
    setIsDeclined(true);
  };

  const handleRemove = (applicantId: string, jobId: any) => {
    dispatch(
      handleRemoveApplicant({
        user_id: applicantId,
        jobId: jobId
      })
    );
    setIsRemoved(true);
  };

  useEffect(() => {
    if (isAssigned) {
      showSnackbar('Application assigned', '', 'success', null, null);
      setIsAssigned(false);
    }
  }, [isAssigned]);

  useEffect(() => {
    if (isDeclined) {
      showSnackbar('Application declined', '', 'success', null, null);
      setIsDeclined(false);
    }
  }, [isDeclined]);

  useEffect(() => {
    if (isRemoved) {
      showSnackbar('Application Removed', '', 'success', null, null);
      setIsRemoved(false);
    }
  }, [isRemoved]);

  return (
    <>
      <Box paddingY={5} paddingX={2} mb={2}>
        <TableContainer>
          <Table>
            <ApplicantTableHead columns={TABLE_HEAD} />
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell
                    align='left'
                    sx={{
                      border: 'none'
                    }}
                  >
                    <Stack direction='row' alignItems={'center'} spacing={2}>
                      <Avatar src={applicant.image} />
                      <Typography
                        color={'#101828'}
                        component={Link}
                        to={'/dashboard/job/1/applicant/1'}
                        textTransform={'capitalize'}
                        sx={{ textDecoration: 'none' }}
                        fontSize={14}
                        fontWeight={500}
                      >
                        {applicant.first_name} {applicant.last_name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell
                    align='left'
                    sx={{
                      border: 'none'
                    }}
                  >
                    <Typography color={'#667085'} textTransform={'capitalize'} fontSize={14} fontWeight={400}>
                      {_.truncate(applicant.jobTitle, { length: 30 })}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align='left'
                    sx={{
                      border: 'none'
                    }}
                  >
                    <StarRating value={applicant.rating} name='read-only' readOnly />
                  </TableCell>
                  <TableCell
                    align='left'
                    sx={{
                      border: 'none'
                    }}
                  >
                    <Stack direction='row' spacing={2} alignItems={'center'}>
                      <AssignText onClick={() => handleAssign(applicant.id, jobId)}>Assign</AssignText>
                      <DeclineText onClick={() => handleDecline(applicant.id, jobId)}>Decline</DeclineText>
                    </Stack>
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      border: 'none'
                    }}
                  >
                    <ApplicantmoreIcon id={applicant.id} deleteApplicant={handleRemove} jobId={jobId} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Divider
        sx={{
          borderColor: '#f2f3f3'
        }}
      />
      {applicants.length > 0 && (
        <Pagination
          onNext={onNextPage}
          onPrev={onPreviousPage}
          page={page}
          pageCount={pageCount}
          handleChange={handleChangePage}
        />
      )}
    </>
  );
};
