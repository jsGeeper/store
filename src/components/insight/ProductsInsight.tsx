import {
  Box,
  Stack,
  Typography,
  Divider,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  styled
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PopoverButton } from '../button/PopoverButton';
import { BalanceWidget } from '../balance-widget/BalanceWidget';
import { SearchField } from '../form/SearchField';
import { ApplicantTableHead } from '../table/components/ApplicantTableHead';
import paginate from '../../utils/paginate';
import { Pagination } from '../pagination';
import formatPrice from '../../utils/formatPrice';
import { IRootReducerState } from '../../redux/IRootReducer';

const TABLE_HEAD = [
  { label: 'Name', align: 'left' },
  { label: 'Quantity instock ', align: 'center' },
  { label: 'Quantity sold', align: 'center' },
  { label: 'Amount', align: 'center' },
  { label: 'Gross sales', align: 'center' }
];

const table_data = [
  { id: 1, name: 'Rice', quantity_instock: 100, quantity_sold: 50, amount: 10000, gross_sales: 500000 },
  { id: 2, name: 'Beans', quantity_instock: 100, quantity_sold: 50, amount: 10000, gross_sales: 500000 },
  { id: 3, name: 'Yam', quantity_instock: 100, quantity_sold: 50, amount: 10000, gross_sales: 500000 },
  { id: 4, name: 'Garri', quantity_instock: 100, quantity_sold: 50, amount: 10000, gross_sales: 500000 },
  { id: 5, name: 'Rice', quantity_instock: 100, quantity_sold: 50, amount: 10000, gross_sales: 500000 }
];

const StyledName = styled(Typography)({
  color: '#101828',
  fontWeight: 500,
  fontSize: 14
});

const StyledField = styled(Typography)({
  color: '#667085',
  fontWeight: 400,
  fontSize: 14
});

export const ProductsInsight: React.FC = () => {
  const { productInsightCount, topPerformingProducts } = useSelector((state: IRootReducerState) => state.insight);

  const [selected, setSelected] = React.useState<string>('today');
  const [paginated, setPaginated] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [temporaryData, setTemporaryData] = useState<any[]>([]);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  useEffect(() => {
    setTemporaryData(paginate(topPerformingProducts, 10));
  }, [topPerformingProducts]);

  useEffect(() => {
    if (temporaryData.length > 0) setPaginated(temporaryData[page]);
  }, [temporaryData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const onNextPage = () => {
    if (page < temporaryData.length - 1) {
      setPage(page + 1);
    }
    return null;
  };

  const onPreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
    return null;
  };

  const handleProductSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredProducts = topPerformingProducts.filter((product: any) =>
      product.product_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setTemporaryData(paginate(filteredProducts, 10));
  };

  return (
    <Box>
      <Stack direction='row' alignItems={'center'} justifyContent={'flex-end'}>
        <PopoverButton
          label='Today'
          data={[
            { label: 'Today', value: 'today' },
            { label: 'Yesterday', value: 'yesterday' },
            { label: 'Last 7 days', value: 'last-7-days' },
            { label: 'Last 30 days', value: 'last-30-days' },
            { label: 'This month', value: 'this-month' },
            { label: 'Last month', value: 'last-month' },
            { label: 'Custom', value: 'custom' }
          ]}
          selected={selected}
          popoverAction={handleSelect}
          showSelected={false}
        />
      </Stack>

      <Box marginTop={3}>
        <Box marginBottom={5} display={'flex'} gap={'20px'} width={'100%'}>
          <Box flexGrow={1}>
            <BalanceWidget label='Listed products' amount={productInsightCount['List of Products']} type='integer' />
          </Box>
          <Box flexGrow={1}>
            <BalanceWidget label='In Stock' type='integer' amount={productInsightCount['In Stock']} />
          </Box>
          <Box flexGrow={1}>
            <BalanceWidget label='Out of stock' amount={productInsightCount['Out of Stock']} type='integer' />
          </Box>
        </Box>

        <Box mb={3}>
          <Typography color='#1D2939' mb={3} fontWeight={600} fontSize={20}>
            Top performing products
          </Typography>

          <SearchField placeholder='Search for Products' onChange={handleProductSearch} width={400} />
        </Box>
        <Divider
          sx={{
            borderColor: '#f2f3f3'
          }}
        />
        <Box>
          <TableContainer>
            <Table>
              <ApplicantTableHead columns={TABLE_HEAD} />
              <TableBody>
                {temporaryData[page] !== undefined &&
                  temporaryData[page].length > 0 &&
                  temporaryData[page].map((product: any) => (
                    <TableRow key={product.id}>
                      <TableCell align='left' sx={{ border: 'none' }}>
                        <StyledName>{product.product_name}</StyledName>
                      </TableCell>

                      <TableCell align='center' sx={{ border: 'none' }}>
                        <StyledField>{product.storeProductQuantity}</StyledField>
                      </TableCell>
                      <TableCell align='center' sx={{ border: 'none' }}>
                        {/* <StyledField>{product.quantity_sold}</StyledField> */}
                      </TableCell>
                      <TableCell align='center' sx={{ border: 'none' }}>
                        <StyledField>{formatPrice(parseInt(product.productPrice))}</StyledField>
                      </TableCell>
                      <TableCell align='center' sx={{ border: 'none' }}>
                        <StyledField>{formatPrice(product.gross_sales)}</StyledField>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Divider
          sx={{
            borderColor: '#f2f3f3'
          }}
        />
        {temporaryData[page] !== undefined && temporaryData[page].length > 0 && (
          <Pagination
            onNext={onNextPage}
            onPrev={onPreviousPage}
            page={page + 1}
            pageCount={temporaryData.length}
            handleChange={handleChangePage}
          />
        )}
      </Box>
    </Box>
  );
};
