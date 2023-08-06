import React from 'react';
import { Box } from '@mui/material';

interface IProps {
  bannerImg: string;
}

const BannerBoxStyle = {
  height: '20rem',
  overflow: 'hidden'
};

const ImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const StoreBanner: React.FC<IProps> = ({ bannerImg }: IProps) => {
  return (
    <Box sx={BannerBoxStyle}>
      <img src={bannerImg} alt='store banner' style={ImageStyle} />
    </Box>
  );
};

export default StoreBanner;
