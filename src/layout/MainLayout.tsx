import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Drawer } from '../components/Drawer';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { toggleDrawer } from '../redux/slices/cartSlice';

export const MainLayout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const salePrice = useSelector((state: RootState) => state.cart.salePrice);
  const drawerOpen = useSelector((state: RootState) => state.cart.drawerOpen);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      {drawerOpen && (
        <Drawer
          cartTotalPrice={totalPrice}
          cartSalePrice={salePrice}
          onClickClose={() => dispatch(toggleDrawer(false))}
        />
      )}
      <Header
        cartTotalPrice={totalPrice}
        onClickOpenDrawer={() => dispatch(toggleDrawer(true))}
      />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};
