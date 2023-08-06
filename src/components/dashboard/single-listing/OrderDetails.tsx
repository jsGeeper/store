import React, { useEffect } from 'react';
import { OrderAnalytics } from '../../order-analytics-card';
import { OrdersTable } from './components';
import { dummyOrders } from './components/dummy';
import paginate from '../../../utils/paginate';
import { SearchAndFilter } from '../../search-and-filter';
import { Pagination } from '../../pagination';

const OrderDetails = () => {
  const [paginated, setPaginated] = React.useState<any[]>([]);
  const [tempOrders, setTempOrders] = React.useState<any[]>([]);
  const [pages, setPages] = React.useState<number>(0);

  useEffect(() => {
    setTempOrders(paginate(dummyOrders, 5));
  }, []);

  useEffect(() => {
    if (tempOrders.length > 0) setPaginated(tempOrders[pages]);
  }, [tempOrders]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPages(newPage - 1);
  };

  const handleSearch = (value: string) => {
    const filtered = dummyOrders.filter((order) => order.orderId.includes(value));
    setTempOrders(paginate(filtered, 5));
  };

  const onNextPage = () => {
    if (pages < tempOrders.length - 1) {
      setPages(pages + 1);
    }
    return null;
  };

  const onPreviousPage = () => {
    if (pages > 0) {
      setPages(pages - 1);
    }
    return null;
  };

  return (
    <main id='order-tab'>
      <OrderAnalytics />
      <SearchAndFilter onSearch={handleSearch} />
      <OrdersTable orders={tempOrders[pages] || []} />
      <Pagination
        pageCount={tempOrders.length}
        page={pages + 1}
        handleChange={handleChangePage}
        onNext={onNextPage}
        onPrev={onPreviousPage}
      />
    </main>
  );
};

export default OrderDetails;
