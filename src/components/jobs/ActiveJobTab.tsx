import React from 'react';
import { Box } from '@mui/material';
import { JobFilter } from './jobFilter';
import { EmptyJobCard } from './EmptyJobCard';
import { JobGrid } from './JobGrid';

interface ActiveJobTabProps {
  data: any[];
}

export const ActiveJobTab: React.FC<ActiveJobTabProps> = ({ data }: ActiveJobTabProps) => {
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
      {jobs.length === 0 ? <EmptyJobCard type='active job' /> : <JobGrid data={jobs} />}
    </Box>
  );
};
