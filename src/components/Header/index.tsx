import { Link } from 'react-router-dom';

import { IHeaderProps } from './Header.props';

import './Header.css';

export const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <header className="header">
      <Link to="/">
        <div className="header__left">
          <img className="header__logo" src="/png/logo.png" alt="Logo" />
          <div className="header__text">
            <h2>React Sneakers</h2>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="header__right">
          <li onClick={props.onClickOpenDrawer} className="header__list-elem">
            <img src="/svg/cart.svg" alt="Cart" />
            <b>{props.cartTotalPrice} руб.</b>
          </li>
        <Link to="favorites">
          <li className="header__list-elem">
            <img src="/svg/heart.svg" alt="Saved" />
            <span>Закладки</span>
          </li>
        </Link>
        <Link to='cart'>
          <li className="header__list-elem">
            <img src="/svg/profile.svg" alt="Profile" />
            <span>Профиль</span>
          </li>
        </Link>
      </ul>
    </header>
  );
};
