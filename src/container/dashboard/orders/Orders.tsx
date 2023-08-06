import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { AppWrapper } from '../../../components/layouts/app-wrapper';
import { SearchAndFilter } from '../../../components/search-and-filter';
import { ListWithCheckBox } from '../../../components/dashboard/orders';
import { dummyItems } from './dummy';
import paginate from '../../../utils/paginate';
import { Pagination } from '../../../components/pagination';
import { fetchOrders } from '../../../redux/slice/orders/orders.slice';

const Orders = () => {
  const [paginated, setPaginated] = React.useState<any[]>([]);
  const [tempOrders, setTempOrders] = React.useState<any[]>([]);
  const [pages, setPages] = React.useState<number>(0);

  const dispatch = useDispatch();
  const { orders } = useSelector((state: any) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  useEffect(() => {
    setTempOrders(paginate(orders, 10));
  }, [orders]);

  useEffect(() => {
    if (tempOrders.length > 0) setPaginated(tempOrders[pages]);
  }, [tempOrders]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPages(newPage - 1);
  };

  const handleSearch = (search: string) => {
    const filtered = dummyItems.filter((order) => order.name.includes(search));
    setTempOrders(paginate(filtered, 10));
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
    <React.Fragment>
      <Helmet>
        <title>Orders | Go-Geeper</title>
      </Helmet>
      <main id='orders'>
        <AppWrapper title='Orders'>
          <div className='container'>
            <SearchAndFilter onSearch={handleSearch} />
            <ListWithCheckBox listData={tempOrders[pages] || []} />
            <Pagination
              pageCount={tempOrders.length}
              handleChange={handleChangePage}
              onNext={onNextPage}
              onPrev={onPreviousPage}
              page={pages + 1}
            />
          </div>
        </AppWrapper>
      </main>
    </React.Fragment>
  );
};

export default Orders;
