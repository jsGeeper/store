import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Divider } from '@mui/material';
import { Helmet } from 'react-helmet';
import { BsFilter } from 'react-icons/bs';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { SearchField } from '../../components/form/SearchField';
import { ApplicantTableList } from '../../components/jobs';
import paginate from '../../utils/paginate';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducerState } from '../../redux/IRootReducer';
import { getAllApplicants } from '../../redux/slice/jobs/jobs.slice';

export const JobApplicantList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { applicants } = useSelector((state: IRootReducerState) => state.jobs);

  const [paginated, setPaginated] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [temporaryData, setTemporaryData] = useState<any[]>([]);

  useEffect(() => {
    dispatch(
      getAllApplicants({
        jobId: id
      })
    );
  }, []);

  useEffect(() => {
    setTemporaryData(paginate(applicants, 5));
  }, [applicants]);

  useEffect(() => {
    if (temporaryData.length > 0) setPaginated(temporaryData[page]);
  }, [temporaryData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const onNextPage = () => {
    if (page < temporaryData.length - 1) {
      setPage(page + 1);
    }
    return null;
  };

  const onPreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
    return null;
  };

  const handleSearch = (search: any) => {
    const filtered = applicants.filter((item: any) => {
      const { first_name, last_name } = item;
      return (
        first_name.toLowerCase().includes(search.toLowerCase()) ||
        last_name.toLowerCase().includes(search.toLowerCase())
      );
    });
    setTemporaryData(paginate(filtered, 10));
  };

  return (
    <AppWrapper title={`Jobs / ${id} / Applcant list`}>
      <Helmet>
        <title>Jobs / {id} / Applcant list</title>
      </Helmet>
      <Box paddingY={5} paddingX={2}>
        <Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={2}>
            <SearchField placeholder='Search for Applicant name' onChange={(e) => handleSearch(e.target.value)} />
            <Button
              variant='contained'
              startIcon={<BsFilter fill={'#344054'} size={22} />}
              sx={{
                backgroundColor: '#FFFFFF',
                p: '10px 20px',
                color: '#344054',
                fontSize: '1.4rem',
                fontWeight: 500,
                borderRadius: '8px',
                border: '1px solid #D0D5DD',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            >
              Filter
            </Button>
          </Box>
          <Divider
            sx={{
              borderColor: '#f2f3f3'
            }}
          />
        </Box>

        <ApplicantTableList
          applicants={temporaryData[page] || []}
          handleChangePage={handleChangePage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          page={page + 1}
          pageCount={temporaryData.length}
          jobId={id}
        />
      </Box>
    </AppWrapper>
  );
};
