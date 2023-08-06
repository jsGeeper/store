import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { isString } from 'lodash';
import { AiOutlineClose } from 'react-icons/ai';
import {
  Box,
  List,
  Paper,
  ListItem,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
  styled,
  IconButton as MIconButton
} from '@mui/material';
import { fData } from '../../utils/formatNumber';
import UPLOAD from '../../assets/upload.png';
import FILE from '../../assets/file.png';

interface IProps {
  error?: boolean;
  showPreview?: boolean;
  files?: any;
  onRemove?: any;
  onRemoveAll?: any;
  sx?: any;
  [key: string]: any;
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

const UploadMultiFile: React.FC<IProps> = ({
  error,
  showPreview = false,
  files,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: IProps) => {
  const hasFile = files.length > 0;

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    ...other
  });

  const ShowRejectionItems = () => (
    <Paper
      variant='outlined'
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light'
      }}
    >
      {fileRejections.map(({ file, errors }: { file: any; errors: any }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant='subtitle2' noWrap fontFamily={'Inter'} fontSize={12}>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e: any) => (
              <Typography key={e.code} variant='caption' component='p' fontSize={10}>
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
        <AnimatePresence>
          {files.map((file: any) => {
            const { name, size, preview } = file;
            const key = isString(file) ? file : name;

            if (showPreview) {
              return (
                <ListItem
                  key={key}
                  component={motion.div}
                  sx={{
                    p: 0,
                    m: 0.5,
                    width: 80,
                    height: 80,
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'inline-flex'
                  }}
                >
                  <Paper
                    variant='outlined'
                    component='img'
                    src={isString(file) ? file : preview}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}
                  />
                  <Box sx={{ top: -2, right: -6, position: 'absolute', background: '#F3FEE7', borderRadius: 1 }}>
                    <MIconButton
                      size='small'
                      onClick={() => onRemove(file)}
                      sx={{
                        p: '3px'
                      }}
                    >
                      <AiOutlineClose fill='#66C61C' size={16} />
                    </MIconButton>
                  </Box>
                </ListItem>
              );
            }

            return (
              <ListItem
                key={key}
                component={motion.div}
                // {...varFadeInRight}
                sx={{
                  my: 1,
                  py: 0.75,
                  px: 2,
                  borderRadius: 1
                }}
              >
                <ListItemText
                  primary={isString(file) ? file : name}
                  secondary={isString(file) ? '' : fData(size)}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <ListItemSecondaryAction>
                  <MIconButton edge='end' size='small' onClick={() => onRemove(file)}>
                    <AiOutlineClose />
                  </MIconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </AnimatePresence>
      </List>

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

        <img src={UPLOAD} />

        <Box sx={{ p: 1.5, ml: { md: 2 } }}>
          <Typography gutterBottom variant='h5'>
            <Typography variant='h5' component='span' color={'#027a48'} fontWeight={'500'}>
              Click to upload
            </Typography>{' '}
            or drag and drop
          </Typography>

          <Typography variant='body1' sx={{ color: 'text.secondary' }} gutterBottom>
            Add up to 5 images (PNG, PDF, JPG or GIF). Max size:5mb
          </Typography>
        </Box>
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
};

export default UploadMultiFile;
