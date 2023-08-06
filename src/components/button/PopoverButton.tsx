import React from 'react';
import { Box, Button, Popover, Typography, List, ListItem, Stack } from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FcCheckmark } from 'react-icons/fc';

interface PopoverButtonProps {
  selected: string;
  popoverAction: any;
  label: string;
  data: { label: string; value: string }[];
  showSelected?: boolean;
}

export const PopoverButton: React.FC<PopoverButtonProps> = ({
  data,
  label,
  popoverAction,
  selected,
  showSelected = true
}: PopoverButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'reuseable-popover' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant='contained'
        onClick={handleClick}
        sx={{
          marginRight: 2,
          fontFamily: 'Inter',
          textTransform: 'none',
          bgcolor: '#fff',
          color: '#344054',
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          border: '1px solid #D0D5DD',
          padding: '10px 16px',
          borderRadius: '8px',
          fontSize: 16,
          fontWeight: 400,
          '&:hover': {
            backgroundColor: '#fff'
          }
        }}
        endIcon={open ? <IoIosArrowUp fill='#344054' /> : <IoIosArrowDown fill='#344054' />}
      >
        {label}{' '}
        {showSelected && (
          <em
            style={{
              marginLeft: '5px',
              fontWeight: 500,
              color: '#344054',
              textTransform: 'capitalize',
              fontStyle: 'normal'
            }}
          >
            {selected}
          </em>
        )}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ p: 1, width: 300 }}>
          {data.length > 0 && (
            <List>
              {data.map((item, index) => (
                <ListItem
                  key={index}
                  onClick={() => {
                    popoverAction(item.value);
                    handleClose();
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <Stack direction='row' alignItems='center' justifyContent='space-between' width={'100%'}>
                    <Typography variant='body1' sx={{ fontWeight: 500 }} color={'#344054'} fontSize={16} flex={1}>
                      {item.label}
                    </Typography>
                    {item.value.toLowerCase() === selected.toLowerCase() && <FcCheckmark size={20} color='#344054' />}
                  </Stack>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Popover>
    </>
  );
};
