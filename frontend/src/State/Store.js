import {configureStore} from '@reduxjs/toolkit'
import  BookDetail  from '../features/Books';
import  UserAuth  from '../features/Users';
import LogsDetail from '../features/Logs';

export const Store = configureStore( {
  reducer:{
    app:BookDetail,
    auth:UserAuth,
    logs:LogsDetail

  }
});

export default Store;
