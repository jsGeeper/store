import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppWrapper } from '../../../components/layouts/app-wrapper';
import { IRootReducerState } from '../../../redux/IRootReducer';
import { ProfileCard, StoreBanner } from '../../../components/dashboard/store-listing';
import { ProductCard } from '../../../components/product-card';
import { getProductListing } from '../../../redux/slice/stall/stallActions';
import useGetStore from '../../../react-query/hooks/useGetStore';

const StoreListing = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetStore();
  console.log(data);
  // const dispatch = useDispatch();

  // const { user } = useSelector((state: IRootReducerState) => state.auth);
  // const { listStores, getFarmerProducts } = useSelector((state: IRootReducerState) => state.stall);

  // React.useEffect(() => {
  //   dispatch(getProductListing({ id: listStores?.storeId }));
  // }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Store | Go-Geeper</title>
      </Helmet>
      <main id='storeListing'>
        {data && data?.success && (
          <AppWrapper title={'Store'}>
            <StoreBanner bannerImg={data.data.store.banner} />
            <div className='mb-2'>
              <ProfileCard storeInfo={data} />
            </div>
            <div className='storeListing__products'>
              <div className='title'>
                <h3>Products</h3>
              </div>
              {/* <ProductCard products={getFarmerProducts} /> */}
            </div>
          </AppWrapper>
        )}
      </main>
    </React.Fragment>
  );
};

export default StoreListing;
