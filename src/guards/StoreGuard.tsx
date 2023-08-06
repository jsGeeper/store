import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { IRootReducerState } from '../redux/IRootReducer';
// import { PATH_DASHBOARD, PATH_MAIN } from '../router/pages';
import { getStallList } from '../redux/slice/stall/stallActions';

interface Props {
  children: React.ReactNode;
}

const StoreGuard = ({ children }: Props) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const { listStores } = useSelector((state: IRootReducerState) => state.stall);
  // const { hasStore } = listStores;

  // const [loading, setLoading] = React.useState(false);

  // React.useEffect(() => {
  //   setLoading(true);
  //   dispatch(getStallList()).then(() => setLoading(false));
  // }, []);

  // React.useEffect(() => {
  //   if (hasStore) {
  //     navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.STORE}`);
  //   } else {
  //     navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.STORE_SETUP}`);
  //   }
  // }, [hasStore]);

  return <>{children}</>;
};

export default StoreGuard;
