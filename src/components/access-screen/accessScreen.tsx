import { Container, Box, Typography, Button } from '@mui/material';
interface IAccess {
  url: string;
}
const AccessScreen = ({ url }: IAccess) => {
  return (
    <Container>
      <Box textAlign={'center'} my={'10em'}>
        <Typography fontSize={['4em', '2em', '45px']} my={'.5em'} fontWeight={'600'}>
          Access to This Page is Restricted
        </Typography>
        <Typography color={'#667085'} fontSize={['17px', '18px', '20px']} width={['100%', '100%', '768px']} mx={'auto'}>
          You don’t have access to this page, we advice to upgrade your account to access the store feature
        </Typography>

        <a href={`${url}/my-account`}>
          <Button
            sx={{
              background: '#4CA30D',
              color: '#fff',
              borderRadius: '8px',
              padding: '1em 2em',
              fontSize: '15px',
              margin: '1em 0',
              '&:hover': {
                background: '#4CA30D'
              }
            }}
            size={'large'}
          >
            Upgrade Account
          </Button>
        </a>

        <Typography fontSize={'19px'}>
          <a
            href={'mailto:support@gogeeper.com'}
            style={{
              color: '#4CA30D'
            }}
          >
            Contact Support
          </a>
        </Typography>
      </Box>
    </Container>
  );
};
export default AccessScreen;
