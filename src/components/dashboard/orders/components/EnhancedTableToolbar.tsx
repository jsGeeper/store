import React from 'react';
import { Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';

interface EnhancedTableToolbarProps {
  numSelected: number;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='h6' component='div'>
          {numSelected} selected
        </Typography>
      ) : null}
      {numSelected > 0 && (
        <Tooltip title='Delete'>
          <IconButton>
            <MdDeleteOutline size={22} fill={'#b42318'} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
