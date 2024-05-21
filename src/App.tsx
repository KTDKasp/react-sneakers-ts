import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainLayout } from './layout/MainLayout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { CartPage } from './pages/CartPage';
import AppContext, { AppContextType } from './context';

import './app.css';

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

	const context: AppContextType = {
		setDrawerOpen,
		drawerOpen
	};

  return (
    <div className="container">
      <AppContext.Provider value={context}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
