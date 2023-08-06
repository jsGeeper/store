import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import { rootReducer, rootPersistConfig } from './rootReducer';

export const history = createBrowserHistory();
export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer(history)),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: {
        extraArgument: {
          api: {
            get: () => {
              return new Promise((resolve) => {
                resolve(true);
              });
            }
          }
        }
      }
    }),
  devTools: true
});

export const persistor = persistStore(store);
