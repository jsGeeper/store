import React from 'react';
import { Box, Grid, Button, Paper, IconButton, InputBase } from '@mui/material';
import { BsFilter } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

interface SearchAndFilterProps {
  onSearch: (value: string) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch }: SearchAndFilterProps) => {
  return (
    <Box marginBottom={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Paper
              component={'form'}
              elevation={0}
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
                borderRadius: '8px',
                border: '1px solid #D0D5DD'
              }}
            >
              <IconButton sx={{ p: '10px' }} aria-label='menu'>
                <FiSearch size={20} color={'#101828'} />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, p: 0, fontSize: '1.4rem' }}
                placeholder='Search for Order ID'
                inputProps={{ 'aria-label': 'Search for Order ID' }}
                onChange={(e) => onSearch(e.target.value)}
              />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        </Grid>
      </Grid>
    </Box>
  );
};
