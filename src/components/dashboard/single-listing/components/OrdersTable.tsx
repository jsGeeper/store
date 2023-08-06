import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableContainer, TableBody, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import formatPrice from '../../../../utils/formatPrice';
import { BadgeHandler } from '../../../badge-handler';
import { PATH_DASHBOARD, PATH_MAIN } from '../../../../router/pages';

interface OrdersTableProps {
  orders: any[];
}

const StyledTableHead = {
  fontWeight: 500,
  fontSize: '1.2rem',
  fontFamily: 'Inter',
  color: '#667085',
  padding: '16px 24px',
  borderBottom: 'none'
};

const StyledOrderCell = {
  color: '#101828',
  fontWeight: 500,
  fontSize: '1.4rem',
  padding: '16px 24px',
  borderBottom: 'none'
};

const StyledTableCell = {
  color: '#667085',
  fontWeight: 400,
  fontSize: '1.4rem',
  lineHeight: '2.0rem',
  padding: '16px 24px',
  borderBottom: 'none'
};

const LinkStyle = {
  color: '#101828',
  textDecoration: 'none'
};

const badgeStyle = {
  padding: `2px 8px 2px 6px`,
  borderRadius: '1.6rem'
};

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }: OrdersTableProps) => {
  return (
    <section className='mb-2'>
      <hr className='hr mb-2' />
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table' size='medium' border={0}>
          <TableHead>
            <TableRow>
              <TableCell sx={StyledTableHead} align='center'>
                Order ID
              </TableCell>
              <TableCell sx={StyledTableHead} align='center'>
                Quantity
              </TableCell>
              <TableCell sx={StyledTableHead} align='center'>
                Date
              </TableCell>
              <TableCell sx={StyledTableHead} align='center'>
                Status
              </TableCell>
              <TableCell sx={StyledTableHead} align='center'>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length > 0 &&
              orders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell sx={StyledOrderCell} align='center'>
                    <Link
                      to={`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.ORDER_DETAILS}/order=${order.id}/pld=${order.status}`}
                      style={LinkStyle}
                    >
                      {order.orderId}
                    </Link>
                  </TableCell>
                  <TableCell sx={StyledTableCell} align='center'>
                    {order.quantity}
                  </TableCell>
                  <TableCell sx={StyledTableCell} align='center'>
                    {moment(order.orderDate).format('DD MMM YYYY')}
                  </TableCell>
                  <TableCell sx={StyledTableCell} align='center'>
                    <BadgeHandler status={order.status} align={'center'} />
                  </TableCell>
                  <TableCell sx={StyledTableCell} align='center'>
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr className='hr mt-2' />
    </section>
  );
};
