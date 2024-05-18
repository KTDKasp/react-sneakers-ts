import React from 'react';
import axios from 'axios';

import { CartItem } from '../CartItem';
import { Info } from '../Info';
import AppContext from '../../context';

import { IOrders } from '../../interfaces/orders.inteface';
import { IDrawerProps } from './Drawer.props';

import arrowClose from '/svg/arrow-next-drawer.svg';
import './Drawer.css';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { clearCart, removeFromCart } from '../../redux/slices/cartSlice';

export const Drawer: React.FC<IDrawerProps> = (props) => {
  const { animationParent } = React.useContext(AppContext);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const [isOrderCompleted, setIsOrderCompleted] = React.useState<boolean>(false);
	const [orderId, setOrderId] = React.useState<number>(0);

  const createOrder = React.useCallback(async () => {
    try {
      const { data } = await axios.post<IOrders>(
        'https://6d35450ae5876ee3.mokky.dev/orders',
        {
          items: cartItems,
          total: props.cartTotalPrice
        }
      );
      dispatch(clearCart());
      setIsOrderCompleted(true);
			setOrderId(data.id);
      return data;
    } catch (e) {
      console.log(e);
    }
  }, []);

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
              onClick={() => createOrder()}
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
            onClickClose={() => setIsOrderCompleted(false)}
          />
        )}
      </div>
    </>
  );
};
