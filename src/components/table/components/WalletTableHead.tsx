import React from 'react';
import { TableHead, TableRow, TableCell, Typography } from '@mui/material';

interface IProps {
  columns: { label: string }[];
}

export const WalletTableHead: React.FC<IProps> = ({ columns }: IProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell, index) => (
          <TableCell
            key={index}
            align={'left'}
            sx={{
              border: 'none'
            }}
          >
            <Typography variant={'body1'} fontWeight={'500'} color={'#344054'} fontSize={'1.2rem'}>
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
