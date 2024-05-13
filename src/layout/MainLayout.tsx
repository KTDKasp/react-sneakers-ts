import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Drawer } from '../components/Drawer';
import AppContext from '../context';

export const MainLayout = () => {
  const { cartItems, drawerOpen, setDrawerOpen } = React.useContext(AppContext);

  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [salePrice, setSalePrice] = React.useState<number>(0);

  React.useEffect(() => {
    setTotalPrice(() =>
      cartItems.reduce((acc, item) => acc + Number(item.price), 0)
    );
    setSalePrice(() =>
      cartItems.reduce((acc, item) => Math.round(acc + Number(item.price) * 0.05), 0)
    );
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
