import {configureStore} from '@reduxjs/toolkit'
import  BookDetail  from '../features/Books';

export const Store = configureStore( {
  reducer:{
    app:BookDetail
  }
});

export default Store;
