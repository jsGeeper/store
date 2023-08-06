import React from 'react';
import { JobFilter } from './jobFilter';
import { Box } from '@mui/material';
import { EmptyJobCard } from './EmptyJobCard';
import { JobGrid } from './JobGrid';

interface CompletedJobTabProps {
  data: any[];
}

export const CompletedJobTab: React.FC<CompletedJobTabProps> = ({ data }: CompletedJobTabProps) => {
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
      <JobFilter handleSearch={handleFilter} />
      {jobs.length === 0 ? <EmptyJobCard type='completed job' /> : <JobGrid data={jobs} />}
    </Box>
  );
};
