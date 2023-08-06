import React from 'react';
import { TableContainer, Table, TableRow, Box, TableBody, TableCell, Paper, Typography, styled } from '@mui/material';
import moment from 'moment';
import _ from 'lodash';
import { WalletTableHead } from '../table/components/WalletTableHead';
import formatPrice from '../../utils/formatPrice';
import { BadgeHandler } from '../badge-handler';

interface IProps {
  listData: any[];
}

const StyledTableText = styled(Typography)({
  color: '#344054'
});

export const WalletTable: React.FC<IProps> = ({ listData }: IProps) => {
  return (
    <Box width={'100%'}>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <WalletTableHead
            columns={[
              { label: 'Transaction ID' },
              { label: 'Transaction type' },
              { label: 'Amount' },
              { label: 'Date and Time' },
              { label: 'Status' }
            ]}
          />

          <TableBody>
            {listData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell component='th' scope='row'>
                  <StyledTableText fontWeight={400} fontSize={14}>
                    {_.truncate(row.trans_id, { length: 10 }) || 'N/A'}
                  </StyledTableText>
                </TableCell>
                <TableCell align='left'>
                  <StyledTableText fontWeight={400} fontSize={14}>
                    {row.type}
                  </StyledTableText>
                </TableCell>
                <TableCell align='left'>
                  <StyledTableText fontWeight={400} fontSize={14}>
                    {formatPrice(row.amount)}
                  </StyledTableText>
                </TableCell>
                <TableCell align='left'>
                  <StyledTableText fontWeight={400} fontSize={14}>
                    {moment(row.orderDate).format('L, h:mm:ss a')}
                  </StyledTableText>
                </TableCell>
                <TableCell align='left'>
                  <StyledTableText fontWeight={400} fontSize={14}>
                    {row.status}
                  </StyledTableText>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
