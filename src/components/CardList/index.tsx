import React from 'react';
import AppContext from '../../context';
import { Card } from '../Card';

import './CardList.css';
import { ICardListProps } from './CardList.props';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IProduct } from '../../interfaces/product.interface';

export const CardList: React.FC<ICardListProps> = ({ items, onAddToCart, onAddToFavotites, onRemoveFromFavorites }) => {
  const { animationParent } = React.useContext(AppContext);
  const favoriteItems = useSelector((state: RootState) => state.favorites.favoriteItems);

	// #TODO: постараться убрать этот костыль onClickOnFaviorite
  const onClickOnFavorite = (obj: IProduct) => {
    const isItemFavorite = favoriteItems.find((item) => Number(item.itemId) === Number(obj.id));
    if (isItemFavorite) {
      onRemoveFromFavorites(obj);
    } else {
      onAddToFavotites(obj);
    }
  };

  return (
    <div ref={animationParent} className="card-list">
      {items.map((item, index) => (
        <Card
          key={index}
          id={item.id}
          price={item.price}
          title={item.title}
          imageUrl={item.imageUrl}
          isFavorite={favoriteItems?.some((obj) => Number(obj.itemId) === Number(item.id))}
          onClickAdd={(obj) => onAddToCart(obj)}
          onClickFavorite={(obj) => onClickOnFavorite(obj)}
        />
      ))}
    </div>
  );
};
