import React from 'react';
import { Grid, Box, Button, Pagination as MuiPagination } from '@mui/material';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface PaginationProps {
  pageCount: number;
  page?: number;
  handleChange: any;
  onNext: any;
  onPrev: any;
}

const Trigger = {
  padding: '0.8rem 1.4rem',
  textTransform: 'none',
  color: '#344054',
  fontSize: '1.4rem',
  fontWeight: 500,
  border: '1px solid #D0D5DD',
  borderRadius: '0.8rem',
  boxShadow: `0 1px 2px rgba(16, 24, 40, 0.05)`,
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: '#f3fee7'
  }
};

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  page,
  handleChange,
  onPrev,
  onNext
}: PaginationProps) => {
  return (
    <div id='pagination'>
      <Grid container justifyContent='space-between' alignSelf='center' className='mt-2'>
        <Grid item>
          <Button sx={Trigger} variant='outlined' onClick={onPrev} startIcon={<FiArrowLeft color={'#344054'} />}>
            Previous
          </Button>
        </Grid>
        <Grid item alignSelf='center'>
          <Box>
            <MuiPagination
              count={pageCount}
              page={page}
              hideNextButton
              hidePrevButton
              onChange={handleChange}
              shape='rounded'
            />
          </Box>
        </Grid>
        <Grid item>
          <Button
            sx={Trigger}
            variant='outlined'
            color={'primary'}
            onClick={onNext}
            endIcon={<FiArrowRight color={'#344054'} />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
