import React from 'react';
import { JobFilter } from './jobFilter';
import { Box } from '@mui/material';
import { EmptyJobCard } from './EmptyJobCard';
import { JobGrid } from './JobGrid';

interface DraftTabProps {
  data: any[];
}

export const DraftTab: React.FC<DraftTabProps> = ({ data }: DraftTabProps) => {
  const [jobs, setJobs] = React.useState<any[]>([]);

  const handleFilter = (filter: string) => {
    if (filter.length >= 3) {
      setJobs(data);
      const filteredJobs = data.filter((job) => job.title.toLowerCase().includes(filter.toLowerCase()));
      setJobs(filteredJobs);
    } else {
      setJobs(data);
    }
  };

  React.useEffect(() => {
    setJobs(data);
  }, [data]);

  return (
    <Box>
      <JobFilter />
      {jobs.length === 0 ? <EmptyJobCard type='drafts' /> : <JobGrid data={jobs} />}
    </Box>
  );
};
