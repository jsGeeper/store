import React from 'react';
import { Box } from '@mui/material';
import { JobFilter } from './jobFilter';
import { JobGrid } from './JobGrid';

interface IProps {
  data: any[];
}

export const SeeMyJobComponent: React.FC<IProps> = ({ data }: IProps) => {
  return (
    <Box>
      <JobFilter showPostJob={false} />
      <JobGrid data={data} type='my-job' />
    </Box>
  );
};
