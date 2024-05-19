import React from 'react';
import { IProduct } from './interfaces/product.interface';

export type AppContextType = {
	items: IProduct[];
	setItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
	animationParent?: React.RefCallback<Element>;
	drawerOpen: boolean;
	setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextType>({
	items: [],
	setItems: () => {},
	drawerOpen: false,
	setDrawerOpen: () => {}
});

export default AppContext;