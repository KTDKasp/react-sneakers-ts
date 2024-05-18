import React from 'react';
import { IProduct } from './interfaces/product.interface';

export type AppContextType = {
	items: IProduct[];
	setItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
	animationParent?: React.RefCallback<Element>;
	favoriteItems: IProduct[];
	setFavoriteItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
	onAddToFavotites: (obj: IProduct) => void;
	drawerOpen: boolean;
	setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextType>({
	items: [],
	favoriteItems: [],
	setItems: () => {},
	setFavoriteItems: () => {},
	onAddToFavotites: () => {},
	drawerOpen: false,
	setDrawerOpen: () => {}
});

export default AppContext;