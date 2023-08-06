import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import formatPrice from '../../utils/formatPrice';

const parentBoxStyle = {
  height: '100%',
  fontFamily: 'Inter',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: '2.4rem',
  gap: '2.4rem',
  border: `1px solid #EAECF0`,
  borderRadius: '0.8rem',
  backgroundColor: '#fff',
  boxShadow: `0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)`
};

const actionButtonStyle = {
  color: '#667085',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: '14px',
  ':hover': { backgroundColor: 'transparent' },
  mb: '10px',
  position: 'sticky',
  justifyContent: 'flex-start',
  top: '0',
  width: '100%',
  backgroundColor: '#fff',
  textTransform: 'none',
  cursor: 'default'
};

const OrderAnalyticsCard = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4}>
          <Box sx={parentBoxStyle}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Box>
                <Typography
                  variant='h4'
                  fontWeight={500}
                  fontSize={'1.6rem'}
                  lineHeight={2.4}
                  sx={{ color: '#101828' }}
                >
                  Items sold
                </Typography>
              </Box>
              <Box lineHeight={4.4}>
                <Typography sx={{ fontSize: '3.6rem', fontWeight: 600, color: '#101828', letterSpacing: '-0.02em' }}>
                  32 pots
                </Typography>
                <Box>
                  <Button
                    size='small'
                    startIcon={<AiOutlineArrowUp fill={'#66C61C'} size={20} />}
                    sx={actionButtonStyle}
                  >
                    <span style={{ color: '#66C61C', marginRight: '3px' }}>40%</span> vs yesterday
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={parentBoxStyle}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Box>
                <Typography
                  variant='h4'
                  fontWeight={500}
                  fontSize={'1.6rem'}
                  lineHeight={2.4}
                  sx={{ color: '#101828' }}
                >
                  Remaining items
                </Typography>
              </Box>
              <Box lineHeight={4.4}>
                <Typography sx={{ fontSize: '3.6rem', fontWeight: 600, color: '#101828', letterSpacing: '-0.02em' }}>
                  54 pots
                </Typography>
                <Box>
                  <Button
                    size='small'
                    startIcon={<AiOutlineArrowDown fill={'#B42318'} size={20} />}
                    sx={actionButtonStyle}
                  >
                    <span style={{ color: '#B42318', marginRight: '3px' }}>10%</span> vs last month
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={parentBoxStyle}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Box>
                <Typography
                  variant='h4'
                  fontWeight={500}
                  fontSize={'1.6rem'}
                  lineHeight={2.4}
                  sx={{ color: '#101828' }}
                >
                  Total revenue
                </Typography>
              </Box>
              <Box lineHeight={4.4}>
                <Typography sx={{ fontSize: '3.6rem', fontWeight: 600, color: '#101828', letterSpacing: '0.05em' }}>
                  {formatPrice(250400)}
                </Typography>
                <Box>
                  <Button
                    size='small'
                    startIcon={<AiOutlineArrowUp fill={'#66C61C'} size={20} />}
                    sx={actionButtonStyle}
                  >
                    <span style={{ color: '#66C61C', marginRight: '3px' }}>20%</span> vs last month
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderAnalyticsCard;
