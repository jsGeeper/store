import { Box, Stack } from '@mui/material';
import React from 'react';
import { BsFilter, BsPlus } from 'react-icons/bs';
import { SearchField } from '../form/SearchField';
import { OutlinedButton } from '../button/OutlinedButton';
import ActionButton from '../button/ActionButton';

interface IProps {
  data: any[];
}

export const TeamMembers: React.FC<IProps> = ({ data }: IProps) => {
  return (
    <Box
      padding={0}
      sx={{
        height: 700,
        '@media (min-height: 900px)': {
          height: '100%'
        }
      }}
    >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <SearchField
          placeholder='Search for team member'
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />

        <Stack direction='row' alignItems={'center'} justifyContent={'flex-start'} spacing={2}>
          <OutlinedButton label='Filters' startIcon={<BsFilter />} padding='11px 16px' />
          <ActionButton label='Invite new member' padding='10px 16px' startIcon={<BsPlus />} />
        </Stack>
      </Stack>
    </Box>
  );
};
