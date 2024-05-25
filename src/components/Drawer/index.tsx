import React from 'react';

import { CartItem } from '../CartItem';
import { Info } from '../Info';

import { IDrawerProps } from './Drawer.props';

import arrowClose from '/svg/arrow-next-drawer.svg';
import './Drawer.css';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { clearCart, removeFromCart } from '../../redux/slices/cartSlice';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { createOrder, setOrderCompleted } from '../../redux/slices/orderSlice';
import { IProduct } from '../../interfaces/product.interface';

export interface PostData {
  items: IProduct[];
  total: number;
}

export const Drawer: React.FC<IDrawerProps> = (props) => {
  const [animationParent] = useAutoAnimate();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const isOrderCompleted = useSelector((state: RootState) => state.orders.isOrderCompleted);
  const orderId = useSelector((state: RootState) => state.orders.orderId);
  const dispatch = useAppDispatch();

  const createOrderHandler = React.useCallback(async () => {
      dispatch(createOrder({ items: cartItems, total: props.cartTotalPrice }));
      dispatch(clearCart());
      dispatch(setOrderCompleted(true));
  }, [dispatch, cartItems, props.cartTotalPrice]);

  return (
    <>
      <div className="overlay"></div>
      <div className="drawer">
        <div className="drawer-cart__title">
          <img
            onClick={props.onClickClose}
            className="drawer__close"
            src={arrowClose}
            alt="Close"
          />
          <h2>Корзина</h2>
        </div>

        {cartItems.length > 0 ? (
          <>          
            <div ref={animationParent} className="drawer-cart__list">
              {cartItems.map((obj) => (
                <CartItem
                  key={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  onRemove={() => dispatch(removeFromCart(obj))
                  }
                />
              ))}
            </div>
            <div className="drawer-cart__total">
              <div className="drawer-cart__summary">
                <span>Итого:</span>
                <div></div>
                <b>{props.cartTotalPrice} руб.</b>
              </div>

              <div className="drawer-cart__summary">
                <span>Налог 5%:</span>
                <div></div>
                <b>{props.cartSalePrice} руб.</b>
              </div>
            </div>

            <button
              onClick={() => createOrderHandler()}
              className="button_green"
              disabled={!cartItems.length ? true : false}
            >
              Оформить заказ
            </button>
          </>
        ) : (
          <Info
            title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке.`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы оформить заказ.'
            }
            image={
              isOrderCompleted
                ? '/png/order-success-icon.png'
                : '/png/package-icon.png'
            }
            onClickClose={() => dispatch(setOrderCompleted(false))}
          />
        )}
      </div>
    </>
  );
};
