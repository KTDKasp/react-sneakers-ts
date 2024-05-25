import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  IProduct | undefined,
  IProduct
>('favorites/removeFromFavorites', async (obj, { getState }) => {
  const isItemFavorite = (getState() as RootState).favorites.favoriteItems.find(
    (item) => Number(item.itemId) === Number(obj.id)
  );
  if (isItemFavorite) {
    await axios.delete(
      `https://6d35450ae5876ee3.mokky.dev/favorites/${isItemFavorite.id}`
    );
    return obj;
  }
});

export const addToFavotites = createAsyncThunk<
  IProduct,
  IProduct,
  { state: RootState }
>('favorites/addToFavotites', async (obj: IProduct, { rejectWithValue }) => {
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
});

export interface IFavoritesState {
  favoriteItems: IProduct[];
  status: string;
}

const initialState: IFavoritesState = {
  favoriteItems: [],
  status: 'loading'
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.favoriteItems = [];
        state.status = 'loading';
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action) => {
          state.status = 'ok';
          state.favoriteItems = action.payload;
        }
      )
      .addCase(fetchFavorites.rejected, (state) => {
        state.status = 'error';
        state.favoriteItems = [];
        throw new Error('Failed to fetch favorites items');
      });

    builder
      .addCase(
        addToFavotites.fulfilled,
        (state, action) => {
          state.favoriteItems.push(action.payload);
        }
      )
      .addCase(addToFavotites.rejected, () => {
        throw new Error('Failed to add item to favorites');
      });
    builder
      .addCase(
        removeFromFavorites.fulfilled,
        (state, action) => {
						state.favoriteItems = state.favoriteItems.filter(
							(item) => item.itemId !== action.payload?.id
						);
        }
      )
      .addCase(removeFromFavorites.rejected, () => {
        throw new Error('Failed to remove item from favorites');
      });
  }
});

// Action creators are generated for each case reducer function

export default favoritesSlice.reducer;
