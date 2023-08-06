import React, { useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Menu, MenuItem, ListItemText } from '@mui/material';

interface ApplicantmoreProps {
  id: string;
  deleteApplicant: (id: string, val2: any) => void;
  jobId: any;
}

export function ApplicantmoreIcon({ id, deleteApplicant, jobId }: ApplicantmoreProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(!isOpen)}>
        <BsThreeDotsVertical width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem component={RouterLink} to={`/product/${id}`}>
          <ListItemText primary='View Profile' sx={{ '& .MuiTypography-root': { fontSize: 14 } }} />
        </MenuItem>
        <MenuItem component={RouterLink} to={`/product/${id}`}>
          <ListItemText primary='Report applicant' sx={{ '& .MuiTypography-root': { fontSize: 14 } }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteApplicant(id, jobId);
            setIsOpen(false);
          }}
        >
          <ListItemText
            primary='Remove applicant'
            sx={{ '& .MuiTypography-root': { fontSize: 14, color: '#B42318' } }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
