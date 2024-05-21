import React from 'react';

export type AppContextType = {
	drawerOpen: boolean;
	setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextType>({
	drawerOpen: false,
	setDrawerOpen: () => {}
});

export default AppContext;