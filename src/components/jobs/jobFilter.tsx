import React from 'react';
import { Box, Stack } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../button/ActionButton';
import { PopoverButton } from '../button/PopoverButton';
import { SearchField } from '../form/SearchField';

const filterData = [
  { label: 'Most Recent', value: 'Most recent' },
  { label: 'Highest applicants', value: 'Highest applicants' },
  { label: 'Lowest applicants', value: 'Lowset applicants' }
];

interface JobFilterProps {
  showPostJob?: boolean;
  placeholder?: string;
  handleSearch?: (e: string) => void;
}

export const JobFilter: React.FC<JobFilterProps> = ({
  showPostJob = true,
  placeholder,
  handleSearch
}: JobFilterProps) => {
  const navigate = useNavigate();

  const [selected, setSelected] = React.useState('Most recent');

  return (
    <Box width={'100%'}>
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <SearchField
          placeholder={placeholder !== undefined ? placeholder : 'Search for job title or tag'}
          onChange={(e) => handleSearch && handleSearch(e.target.value)}
        />
        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
          <PopoverButton data={filterData} label='Sort by:' popoverAction={setSelected} selected={selected} />
          {showPostJob && (
            <ActionButton
              label='Post Job'
              startIcon={<AiOutlinePlus color='#fff' fill='#fff' />}
              padding='10px 16px'
              onClick={() => navigate('/dashboard/jobs/init/create')}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
