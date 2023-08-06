import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import UPLOAD from '../../assets/upload.png';
import FILE from '../../assets/file.png';
import { fData } from '../../utils/formatNumber';

interface IUploadSingleFileProps {
  error?: boolean;
  file?: any;
  accept: string;
  displayPreview?: boolean;
  [key: string]: any;
  colorHeader?: string;
  HeaderText?: string;
  subHeaderText?: string;
  formLabel?: string;
}

const DropZoneStyle = styled('div')(() => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  border: `1px solid #D0D5DD`,
  padding: '1.6rem 2.4rem',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: '#fff',
  borderRadius: '.8rem',
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  }
}));

const UploadSingleFile = ({
  error,
  file,
  accept,
  displayPreview,
  HeaderText = 'or drag and drop',
  colorHeader = 'Click to upload',
  subHeaderText = 'Add up to 5 images (PNG, PDF, JPG or GIF). Max size:5mb',
  formLabel,
  ...other
}: IUploadSingleFileProps) => {
  function mimeTypeValidator(file: File) {
    if (file && !file.type.startsWith(accept)) {
      return {
        code: 'invalid-file-type',
        message: `Invalid file type. Please upload a ${accept} file.`
      };
    }

    return null;
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, acceptedFiles, open } = useDropzone({
    multiple: false,
    maxSize: 5000000,
    validator: mimeTypeValidator,
    ...other
  });

  const ShowRejectionItems = () => {
    return (
      <Paper variant='outlined' sx={{ py: 1, px: 2, mt: 3, borderColor: 'error.light' }}>
        {fileRejections.map(({ file, errors }: { file: any; errors: any }) => {
          const { path, size } = file;

          return (
            <Box key={path} sx={{ my: 1 }}>
              <Typography variant='h6' noWrap>
                {path} - {fData(size)}
              </Typography>
              {errors.map((e: any) => (
                <Typography key={e.code} variant='h6' component='h6'>
                  - {e.message}
                </Typography>
              ))}
            </Box>
          );
        })}
      </Paper>
    );
  };

  const ShowFileProgressBar = () => {
    return (
      <Paper variant='outlined' sx={{ py: 1, px: 2, mt: 3, borderColor: 'success.light', borderRadius: '.8rem' }}>
        {acceptedFiles.map((file: any) => {
          const { path, size } = file;

          return (
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }} key={path}>
              <img src={FILE} alt='file' />
              <Box sx={{ ml: 1, flex: 1 }}>
                <Typography variant='h6' noWrap>
                  {file.path}
                </Typography>
                <Typography variant='body1' noWrap>
                  {fData(size)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant='determinate'
                      color='success'
                      value={100}
                      sx={{ height: '.7rem', borderRadius: '1rem' }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant='h6' color='text.secondary'>{`${Math.round(100)}%`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Paper>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h5' fontWeight={'700'} gutterBottom style={{ color: '#344054' }}>
        {formLabel}
      </Typography>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          })
        }}
      >
        <input {...getInputProps()} />

        <img src={UPLOAD} alt={file?.name} />

        <Box sx={{ p: 1.5, ml: { md: 2 } }}>
          <Typography gutterBottom variant='h5'>
            <Typography variant='h5' component='span' color={'#027a48'} fontWeight={'500'} onClick={open}>
              {colorHeader}{' '}
            </Typography>{' '}
            {HeaderText}
          </Typography>

          <Typography variant='body1' sx={{ color: 'text.secondary' }} gutterBottom>
            {subHeaderText}
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            {file && file.name}
          </Typography>
        </Box>

        {/* {file && (
          <Box
            component='img'
            alt='file preview'
            src={isString(file) ? file : file.preview}
            sx={{
              top: 8,
              borderRadius: 1,
              objectFit: 'cover',
              position: 'absolute',
              width: 'calc(100% - 16px)',
              height: 'calc(100% - 16px)'
            }}
          />
        )} */}
      </DropZoneStyle>

      {displayPreview && file && acceptedFiles.length > 0 && <ShowFileProgressBar />}
      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
};

export default UploadSingleFile;
