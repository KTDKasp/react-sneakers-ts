import React from 'react';
import { Card } from '../Card';

import './CardList.css';
import { ICardListProps } from './CardList.props';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { IProduct } from '../../interfaces/product.interface';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { fetchFavorites } from '../../redux/slices/favoritesSlice';

export const CardList: React.FC<ICardListProps> = ({ items, onAddToCart, onAddToFavotites, onRemoveFromFavorites }) => {
  const favoriteItems = useSelector((state: RootState) => state.favorites.favoriteItems);
  const dispatch = useAppDispatch();
  const [animationParent] = useAutoAnimate();

	React.useEffect(() => {
		const fetchData = async () => {
			dispatch(fetchFavorites());
		};
		fetchData();
	}, []);

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
