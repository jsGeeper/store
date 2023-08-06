import React from 'react';
import { Box, Paper, Grid, styled, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import formatPrice from '../../utils/formatPrice';
import truncateText from '../../utils/truncateText';
import { StarRating } from '../rating';
import { SimpleButton } from '../button/SimpleButton';
import { PATH_DASHBOARD, PATH_MAIN } from '../../router/pages';
import Logo from '../../assets/logo.png';

interface IProductCardsProps {
  products: Record<string, any>[];
}

const Item = styled(Paper)({
  width: '28rem',
  position: 'relative'
});

const itemEmpty = {
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(52, 64, 84, 0.7)',
  opacity: 1,
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: 1
};

const ImgStyle = {
  height: '100%',
  width: '100%',
  objectFit: 'cover'
} as React.CSSProperties;

const ButtonStyle = {
  background: '#E4FBCC',
  color: '#4CA30D',
  padding: '16px 28px',
  border: '1px solid #D0D5DD',
  boxShadow: `0 1px 2px rgba(16, 24, 40, 0.05)`,
  borderRadius: `8px`,
  fontSize: '1.8rem'
};

const cardStyle = {
  margin: '1rem'
};

const ProductCards: React.FC<IProductCardsProps> = ({ products }: IProductCardsProps) => {
  return (
    <Box>
      <Stack direction={'row'} flexWrap={'wrap'}>
        {products &&
          products.length > 0 &&
          products.map((product: Record<string, any>) => {
            const productImage = [
              product.storeImageOne,
              product.storeImageTwo,
              product.storeImageThree,
              product.storeImageFour
            ];

            return (
              <Box key={product.id} sx={cardStyle}>
                <Item elevation={0}>
                  {parseInt(product.storeProductQuality) === 0 && (
                    <Box sx={itemEmpty}>
                      <SimpleButton label={'Out of stock'} style={ButtonStyle} />
                    </Box>
                  )}
                  <Box sx={{ height: '25rem', width: '100%' }}>
                    <img src={productImage[0]} alt={product.storeProductName} style={ImgStyle} />
                  </Box>
                  <Box mt={2} p={1.6}>
                    <Link to={`${PATH_MAIN.DASHBOARD}/store/listing/${product.id}`} style={{ textDecoration: 'none' }}>
                      <Typography
                        fontSize={'2rem'}
                        fontWeight={'600'}
                        lineHeight={'30px'}
                        fontFamily={'Inter'}
                        color={'#101828'}
                      >
                        {truncateText(product.storeProductName, 20)}
                      </Typography>
                    </Link>
                    <Grid container spacing={1} xs={12}>
                      <Grid item={true} xs={4}>
                        <Typography
                          fontSize={'1.8rem'}
                          fontWeight={'400'}
                          lineHeight={'28px'}
                          fontFamily={'Inter'}
                          color={'#1D2939'}
                        >
                          {formatPrice(parseInt(product.storeProductPrice))}
                        </Typography>
                      </Grid>
                      <Grid item={true} xs={8}>
                        <Typography
                          fontSize={'1.6rem'}
                          fontWeight={'400'}
                          lineHeight={'24px'}
                          fontFamily={'Inter'}
                          color={'#344054'}
                          mt={-1}
                        >
                          <span style={{ display: 'flex', alignItems: 'center' }}>
                            <BsDot fill={'#326212'} size={40} />{' '}
                            <li style={{ display: 'block' }}>{product.storeProductQuality} in stock</li>
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} xs={12}>
                      <Grid item={true} xs={8}>
                        {/* <StarRating value={product.avg_rating} name={'read-only'} readOnly size={'small'} /> */}
                        <StarRating value={0} name={'read-only'} readOnly size={'small'} />
                      </Grid>
                      <Grid item={true} xs={4}>
                        <Typography
                          fontSize={'1.6rem'}
                          fontWeight={'400'}
                          lineHeight={'24px'}
                          fontFamily={'Inter'}
                          color={'#344054'}
                          mt={0.5}
                        >
                          {/* ({product.total_rating}) */}
                          (0)
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Item>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
};

export default ProductCards;
