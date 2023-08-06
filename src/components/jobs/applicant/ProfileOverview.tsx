import { Box, Button } from '@mui/material';
import React from 'react';
import { BsChatSquareText } from 'react-icons/bs';

export const ProfileOverview: React.FC = () => {
  return (
    <Box position={'relative'}>
      <Box
        height={154}
        width={'100%'}
        sx={{
          background: 'linear-gradient(143.51deg, #101747 3.96%, #298A68 100%)'
        }}
      />

      <Box
        p={1}
        borderRadius={'50%'}
        position={'absolute'}
        bgcolor={'#fff'}
        top={90}
        left={25}
        sx={{
          transform: 'translateX(-10%)'
        }}
      >
        <Box
          component={'img'}
          src='https://plus.unsplash.com/premium_photo-1680268643503-a9956959e8f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
          height={160}
          width={160}
          sx={{ objectFit: 'cover', borderRadius: '50%' }}
        />
      </Box>
      <Box
        paddingY={4}
        paddingX={2}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        position={'absolute'}
        left={'15%'}
        width={'80%'}
        sx={{
          transform: 'translateX(0%)'
        }}
      >
        <Box>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, porro.</h4>
        </Box>
        <Box>
          <Button
            variant='contained'
            startIcon={<BsChatSquareText fill={'#344054'} size={22} />}
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
            Message
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
