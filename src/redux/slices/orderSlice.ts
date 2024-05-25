import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProduct } from '../../interfaces/product.interface';
import { IOrders } from '../../interfaces/orders.inteface';
import { PostData } from '../../components/Drawer';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const { data } = await axios.get<IOrders[]>(
    'https://6d35450ae5876ee3.mokky.dev/orders'
  );
  return data;
});

export const deleteAllOrders = createAsyncThunk('orders/deleteAllOrders', async () => {
  const { data } = await axios.patch('https://6d35450ae5876ee3.mokky.dev/orders', []);
  return data;
});

export const createOrder = createAsyncThunk<IOrders, PostData >(
  'orders/createOrder', async (postData, { rejectWithValue}) => {
    const { data } = await axios.post('https://6d35450ae5876ee3.mokky.dev/orders', {
      items: postData.items,
      total: postData.total
    });
    if (!data) {
      return rejectWithValue('No data returned from the post request'); 
    } else {
      return data;
    }
  }
);

export interface IOrdersState {
  orders: IProduct[];
  isOrderCompleted: boolean;
  orderId: number;
}

const initialState: IOrdersState = {
	orders: [],
  isOrderCompleted: false,
  orderId: 0
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderCompleted: (state, action: PayloadAction<boolean>) => {
      state.isOrderCompleted = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload.map((obj) => obj.items).flat();
    })
    .addCase(fetchOrders.rejected, () => {
      throw new Error('Не удалось загрузить данные');
    });

    builder.addCase(deleteAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
    .addCase(deleteAllOrders.rejected, () => {
      throw new Error('Не удалось удалить данные');
    });

    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orderId = action.payload.id;
    })
    .addCase(createOrder.rejected, () => {
      throw new Error('Не удалось создать заказ');
    });
  }
});

export const { setOrderCompleted } = ordersSlice.actions;

export default ordersSlice.reducer;