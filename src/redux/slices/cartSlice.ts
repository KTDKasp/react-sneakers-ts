import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces/product.interface';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcSalePrice, calcTotalPrice } from '../../utils/cartCalculations';

const { totalPrice, salePrice, items: cartItems } = getCartFromLS();

export interface ICartState {
  cartItems: IProduct[];
	totalPrice: number;
	salePrice: number;
}

const initialState: ICartState = {
	totalPrice: totalPrice,
	salePrice: salePrice,
	cartItems: cartItems
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
		addToCart: (state, action: PayloadAction<IProduct>) => {
			const isItemAdded = state.cartItems.find((obj) => obj.id === action.payload.id);
			if (isItemAdded) {
				state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload.id);
			} else {
				state.cartItems.push(action.payload);
			}

			state.totalPrice = calcTotalPrice(state.cartItems);
			state.salePrice = calcSalePrice(state.cartItems);
		},
		removeFromCart: (state, action: PayloadAction<IProduct>) => {
			state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload.id);

			state.totalPrice = calcTotalPrice(state.cartItems);
			state.salePrice = calcSalePrice(state.cartItems);
		},
		clearCart: (state) => {
			state.cartItems = [];
			state.totalPrice = 0;
			state.salePrice = 0;
		}
  }
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;