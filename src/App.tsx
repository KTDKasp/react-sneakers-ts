import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { MainLayout } from './layout/MainLayout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { CartPage } from './pages/CartPage';
import { IProduct } from './interfaces/product.interface';
import AppContext, { AppContextType } from './context';

import './app.css';

function App() {
  const [favoriteItems, setFavoriteItems] = React.useState<IProduct[]>([]);
  const [items, setItems] = React.useState<IProduct[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [animationParent] = useAutoAnimate();
	
  React.useEffect(() => {
		try {
			const fetchData = async () => {
				const favoritesData = await axios.get('https://6d35450ae5876ee3.mokky.dev/favorites');
				setFavoriteItems(favoritesData.data);
			};
			fetchData();
		} catch (error) {
			console.log(error);
		}
  }, []);

	const onAddToFavotites = async (obj: IProduct) => {
		try {
			const isItemFavorite = favoriteItems.find((item) => Number(item.itemId) === Number(obj.id));
				if (isItemFavorite) {
					axios.delete(`https://6d35450ae5876ee3.mokky.dev/favorites/${isItemFavorite.id}`);
					setFavoriteItems(prev => prev.filter((item) => Number(item.itemId) !== Number(obj.id)));
				} else {
					const { data } = await axios.post<IProduct>('https://6d35450ae5876ee3.mokky.dev/favorites', {
						itemId: obj.id,
						price: obj.price,
						title: obj.title,
						imageUrl: obj.imageUrl
					});
					setFavoriteItems((prev) => [...prev, data]);
				}
		} catch (error) {
			console.log(error);
		}
	};

	const context: AppContextType = {
		items,
		animationParent, 
		setItems, 
		favoriteItems, 
		setFavoriteItems,
		onAddToFavotites,
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
