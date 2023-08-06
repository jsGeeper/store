import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { isString } from 'lodash';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import VIDEO from '../../assets/video.png';
import IMAGE from '../../assets/image.png';
import { fData } from '../../utils/formatNumber';

type MimeType = 'image' | 'video';

interface IUploadProductFileProps {
  mimeType: MimeType;
  accept?: any;
  error?: boolean;
  file?: any;
  [key: string]: any;
  width?: string;
  height?: string;
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
  padding: '1.6rem 0',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: '#fff',
  borderRadius: '.8rem',
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  }
}));

const UploadProductFile: React.FC<IUploadProductFileProps> = ({
  mimeType,
  accept,
  error,
  file,
  width = '85.6px',
  height = 'auto',
  ...other
}: IUploadProductFileProps) => {
  function mimeTypeValidator(file: File) {
    if (file && !file.type.startsWith(accept)) {
      return {
        code: 'invalid-file-type',
        message: `Invalid file type. Please upload a ${accept} file.`
      };
    }

    return null;
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    // accept,
    noClick: false,
    multiple: false,
    maxSize: 5000000,
    validator: mimeTypeValidator,
    ...other
  });

  const ShowRejectionItems = () => {
    return (
      <Paper variant='outlined' sx={{ p: 1, mt: 0.5, borderColor: 'error.light' }}>
        {fileRejections.map(({ file, errors }: { file: any; errors: any }) => {
          const { path } = file;
          return (
            <Box key={path} sx={{ my: 1 }}>
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
  return (
    <Box sx={{ height, width, gap: '16px', margin: '2rem 0' }}>
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

        <img src={mimeType === 'image' ? IMAGE : VIDEO} alt='upload' />

        <Box sx={{ mt: '1rem' }}>
          <Typography gutterBottom variant='h5' sx={{ fontSize: '12px', color: '#3B7C0F' }} align={'center'}>
            Add {mimeType === 'image' ? 'Image' : 'Video'}
          </Typography>
        </Box>

        {file && (
          <Box
            component={mimeType === 'image' ? 'img' : 'video'}
            alt='file preview'
            src={isString(file) ? file : URL.createObjectURL(file)}
            sx={{
              top: 0,
              borderRadius: 1,
              objectFit: 'cover',
              overflow: 'hidden',
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          />
        )}
      </DropZoneStyle>
      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
};

export default UploadProductFile;
