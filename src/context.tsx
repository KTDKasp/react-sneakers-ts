import React from 'react';
import { IProduct } from './interfaces/product.interface';

export type AppContextType = {
	items: IProduct[];
	setItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
	cartItems: IProduct[];
	setCartItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
	animationParent?: React.RefCallback<Element>;
	favoriteItems: IProduct[];
	setFavoriteItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
	onAddToCart: (obj: IProduct) => void;
	onAddToFavotites: (obj: IProduct) => void;
	isItemAdded: (id: number) => boolean;
	drawerOpen: boolean;
	setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextType>({
	items: [],
	cartItems: [],
	favoriteItems: [],
	setItems: () => {},
	setCartItems: () => {},
	setFavoriteItems: () => {},
	onAddToFavotites: () => {},
	onAddToCart: () => {},
	isItemAdded: () => false,
	drawerOpen: false,
	setDrawerOpen: () => {}
});

export default AppContext;