import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '@gogeepernpm/storybook/lib';
import NotificationProvider from './components/NotistackProvider';
import Routers from './router/Router';
// import './App.css';
import './styles/main.scss';
import { IRootReducerState } from './redux/IRootReducer';
import { initialize } from './redux/slice/auth/authAction';
import GlobalStyles from './theme/globalStyles';
import { SnackbarProvider } from './providers/snackbar.provider';
import { Snackbar } from './components/snackbar/Snackbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  const { isInitiated } = useSelector((state: IRootReducerState) => state.auth);

  React.useEffect(() => {
    dispatch(initialize());
  }, [isInitiated]);

  return (
    <NotificationProvider>
      <SnackbarProvider>
        <GlobalStyles />
        <ToastContainer />
        <Snackbar />
        {isInitiated ? <Routers /> : <div>Loading...</div>}
      </SnackbarProvider>
    </NotificationProvider>
  );
}

export default App;
