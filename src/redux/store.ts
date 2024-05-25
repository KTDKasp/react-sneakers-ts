import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoritesSlice';
import sneakersReducer from './slices/sneakersItemsSlice';
import ordersReducer from './slices/orderSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
		cart: cartReducer,
		favorites: favoritesReducer,
		sneakers: sneakersReducer,
		orders: ordersReducer
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// #TODO: Вернуть весь асинхронный код обратно в компоненты
// #TODO: убрать его из слайсов