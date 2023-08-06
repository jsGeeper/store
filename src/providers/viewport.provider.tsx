import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { viewportContext } from '../contexts';

interface ViewportProps {
  children: React.ReactNode;
}
const ViewportProvider = ({ children }: ViewportProps) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  if (width < 800) {
    return (
      <Box height={'100vh'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Container maxWidth={'xs'}>
          <Typography variant={'h3'} textAlign={'center'}>
            For a better experience, please use a larger screen
          </Typography>
        </Container>
      </Box>
    );
  }

  return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>;
};

export default ViewportProvider;
