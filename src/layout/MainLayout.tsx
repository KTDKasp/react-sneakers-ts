import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Drawer } from '../components/Drawer';
import AppContext from '../context';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const MainLayout = () => {
  const { drawerOpen, setDrawerOpen } = React.useContext(AppContext);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const salePrice = useSelector((state: RootState) => state.cart.salePrice);

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      {drawerOpen && (
        <Drawer
          cartTotalPrice={totalPrice}
          cartSalePrice={salePrice}
          onClickClose={() => setDrawerOpen(false)}
        />
      )}
      <Header
        cartTotalPrice={totalPrice}
        onClickOpenDrawer={() => setDrawerOpen(true)}
      />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};
