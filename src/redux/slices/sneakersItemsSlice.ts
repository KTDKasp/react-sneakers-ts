import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../interfaces/product.interface';

export type SearchParams = {
	sortType: string;
	searchValue?: string;
}

export const fetchSneakers = createAsyncThunk<IProduct[], SearchParams>(
	'sneakers/fetchSneakers',
	async ({ sortType, searchValue }) => {
		const params: SearchParams = {
			sortType
		};
		if (searchValue) {
			params.searchValue = `*${searchValue}*`;
		}
		const { data } = await axios.get<IProduct[]>(
			'https://6d35450ae5876ee3.mokky.dev/items', {
				params: {
					sortBy: params.sortType,
					title: params.searchValue
				}
			}
		);
		if (!data) {
			return [];
		} else {
			return data;
		}
	}
);

export interface ISneakersState {
	items: IProduct[];
	searchValue?: string;
	sortType: string;
}

export const initialState: ISneakersState = {
	items: [],
	searchValue: '',
	sortType: 'title'
};

export const sneakersSlice = createSlice({
	name: 'sneakers',
	initialState,
	reducers: {
		setSortType: (state, action: PayloadAction<string>) => {
			state.sortType = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSneakers.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
			state.items = action.payload;
		});
	}
});

export const { setSearchValue, setSortType } = sneakersSlice.actions;

export default sneakersSlice.reducer;