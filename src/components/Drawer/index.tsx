import React from 'react';
import axios from 'axios';

import arrowClose from '/svg/arrow-next-drawer.svg';

import { CartItem } from '../CartItem';
import { Info } from '../Info';
import AppContext from '../../context';

import './Drawer.css';

export const Drawer = (props) => {
  const { animationParent, cartItems, setCartItems } =
    React.useContext(AppContext);
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
	const [orderId, setOrderId] = React.useState(0);

  const onRemoveItem = (obj) => {
    setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
  };

  const createOrder = React.useCallback(async () => {
    try {
      const { data } = await axios.post(
        'https://6d35450ae5876ee3.mokky.dev/orders',
        {
          items: cartItems,
          total: props.cartTotalPrice
        }
      );
      setCartItems([]);
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
                  id={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  onRemove={() => onRemoveItem(obj)}
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
