import React from 'react';
import { JobFilter } from './jobFilter';
import { EmptyJobCard } from './EmptyJobCard';
import { Box } from '@mui/material';
import { JobGrid } from './JobGrid';

interface ArchivedJobTabsProps {
  data: any[];
}

export const ArchivedJobTabs: React.FC<ArchivedJobTabsProps> = ({ data }: ArchivedJobTabsProps) => {
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
      {jobs.length === 0 ? <EmptyJobCard type='archived job' /> : <JobGrid data={jobs} />}
    </Box>
  );
};
