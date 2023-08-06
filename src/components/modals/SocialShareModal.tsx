import React from 'react';
import { Box, Modal, Stack, Typography, Button, Paper, TextField } from '@mui/material';
import { FiCopy } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton
} from 'react-share';
import { PopupStyle, modalStyle } from './modal.shared';
import { useSnackbar } from '../../hooks/useSnackbar';
import { SimpleButton } from '../button/SimpleButton';

interface IProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  jobId: string;
  url: string;
  title: string;
  quote: string;
}

export const SocialShareModal = ({ jobId, onClose, open, onSubmit, quote, title, url }: IProps) => {
  const { showSnackbar } = useSnackbar();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      onClose();
      showSnackbar('Link copied to clipboard', '', 'success', null, null);
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ ...modalStyle }}
      closeAfterTransition
      aria-labelledby={`delete-modal ${jobId}`}
      aria-describedby={`modal-modal-description ${jobId}`}
    >
      <Box sx={{ ...PopupStyle, width: 393 }}>
        <Paper sx={{ padding: '2.4rem' }} elevation={0}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mb={2}>
            <Typography
              variant='h1'
              fontSize={'1.6rem'}
              width={300}
              fontWeight={500}
              fontFamily={'Inter'}
              color='#101828'
              gutterBottom
              flex={1}
            >
              Share this page
            </Typography>
            <MdClose size={24} onClick={onClose} style={{ cursor: 'pointer' }} />
          </Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'} mb={2} mt={2}>
            <FacebookShareButton quote={quote} url={url} hashtag={'#gogeeper'} title={title}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={url}
              title={title}
              hashtags={['gogeeper', 'marketplace', 'commodityLinkage']}
              related={['@imohpeter1', '@obiabo_immanuel', '@gogeeper']}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title} summary={quote} source={url}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </Box>
          <Box>
            <Typography
              variant='body1'
              fontSize={'1.4rem'}
              fontFamily={'Inter'}
              fontWeight={500}
              color='#344054'
              gutterBottom
            >
              or copy link
            </Typography>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <TextField
                id='outlined-basic'
                variant='outlined'
                fullWidth
                value={url}
                InputProps={{
                  readOnly: true
                }}
                size={'small'}
                sx={{ borderRight: 'none' }}
                onClick={(e: any) => {
                  copyToClipboard(e.target.value);
                }}
              />
              <SimpleButton
                label={'Copy'}
                color={'primary'}
                onClick={() => copyToClipboard(url)}
                padding={'.3rem 1.6rem'}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};
