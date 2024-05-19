import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../interfaces/product.interface';
import { RootState } from '../store';

export const fetchFavorites = createAsyncThunk<IProduct[]>(
	'favorites/fetchFavorites',
	async () => {
		const { data } = await axios.get<IProduct[]>(
			'https://6d35450ae5876ee3.mokky.dev/favorites'
		);
		if (!data) {
			return [];
		} else {
			return data;
		}
	}
);

export const removeFromFavorites = createAsyncThunk<
	IProduct,
	IProduct,
	{ state: RootState }
>('favorites/removeFromFavorites', async (obj: IProduct, { getState }) => {
	const isItemFavorite = getState().favorites.favoriteItems.find(
		(item) => Number(item.itemId) === Number(obj.id)
	);
	if (isItemFavorite) {
		await axios.delete(
			`https://6d35450ae5876ee3.mokky.dev/favorites/${isItemFavorite.id}`
		);
		return obj;
	} else {
		return {} as IProduct;
	}
});

export const addToFavotites = createAsyncThunk<
	IProduct,
	IProduct,
	{ state: RootState }
>(
	'favorites/addToFavotites',
	async (obj: IProduct, { rejectWithValue }) => {
		try {
			const { data } = await axios.post<IProduct>(
				'https://6d35450ae5876ee3.mokky.dev/favorites',
				{
					itemId: obj.id,
					price: obj.price,
					title: obj.title,
					imageUrl: obj.imageUrl
				}
			);
			if (!data) {
				return rejectWithValue('No data returned from the post request');
			} else {
				return data;
			}
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export interface IFavoritesState {
	favoriteItems: IProduct[];
}

const initialState: IFavoritesState = {
	favoriteItems: []
};

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		increment: (state) => {
			state.favoriteItems = [];
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavorites.pending, (state) => {
				state.favoriteItems = [];
			})
			.addCase(
				fetchFavorites.fulfilled,
				(state, action: PayloadAction<IProduct[]>) => {
					state.favoriteItems = action.payload;
				}
			)
			.addCase(fetchFavorites.rejected, (state) => {
				state.favoriteItems = [];
				throw new Error('Failed to fetch favorites items');
			});

		builder.addCase(
			addToFavotites.fulfilled,
			(state, action: PayloadAction<IProduct>) => {
				state.favoriteItems.push(action.payload);
			}
		).addCase(addToFavotites.rejected, () => {
			throw new Error('Failed to add item to favorites');
		});
		builder.addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<IProduct>) => {
			state.favoriteItems = state.favoriteItems.filter(
				(item) => Number(item.itemId) !== Number(action.payload?.id)
			);
		}).addCase(removeFromFavorites.rejected, () => {
			throw new Error('Failed to remove item from favorites');
		});
	}
});

// Action creators are generated for each case reducer function
export const { increment } = favoritesSlice.actions;

export default favoritesSlice.reducer;
