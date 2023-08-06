import React from 'react';
import { TableContainer, Table, TableRow, Box, TableBody, TableCell, Checkbox, Paper } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Data, Order } from './data';
import { EnhancedTableHead, EnhancedTableToolbar } from './components';
import formatPrice from '../../../utils/formatPrice';
import { BadgeHandler } from '../../badge-handler';
import { PATH_DASHBOARD, PATH_MAIN } from '../../../router/pages';

interface IProps {
  listData: any[];
}

const badgeStyle = {
  padding: `2px 8px 2px 6px`,
  borderRadius: '1.6rem'
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

const checkboxStyle = {
  '& .MuiSvgIcon-root': { fontSize: 20 }
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const OrderListWithCheckBox: React.FC<IProps> = ({ listData: rows }: IProps) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('orderId');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <hr className='hr mb-2' />
      {selected.length > 0 && <EnhancedTableToolbar numSelected={selected.length} />}
      <TableContainer component={Paper} elevation={0}>
        <Table aria-labelledby='tableTitle' size={'medium'}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row: any, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.payment_reference_gateway)}
                  role='checkbox'
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell sx={StyledTableCell}>
                    <Checkbox
                      size={'medium'}
                      sx={checkboxStyle}
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={StyledOrderCell}
                    align={'center'}
                    component='th'
                    id={labelId}
                    scope='row'
                    padding='none'
                  >
                    <Link
                      to={`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.ORDER_DETAILS}/order=${row.payment_reference_gateway}/pld=${row.name}`}
                      style={LinkStyle}
                    >
                      {row.payment_reference_gateway}
                    </Link>
                  </TableCell>
                  <TableCell sx={StyledTableCell} align='center'>
                    {/* {row.name} */}
                  </TableCell>
                  <TableCell sx={StyledTableCell} align='center'>
                    {/* {row.quantity} */}
                  </TableCell>
                  <TableCell sx={StyledTableCell} align='center'>
                    {moment(row.createdAt).format('DD MMM YYYY')}
                  </TableCell>
                  <TableCell sx={StyledTableCell} align='center'>
                    <BadgeHandler status={row.status || ''} align={'center'} />
                  </TableCell>
                  <TableCell sx={StyledTableCell} align='center'>
                    {formatPrice(row.grand_total)}
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows
                }}
              >
                <TableCell sx={StyledTableCell} colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <hr className='hr mb-2' />
    </Box>
  );
};

export default OrderListWithCheckBox;
