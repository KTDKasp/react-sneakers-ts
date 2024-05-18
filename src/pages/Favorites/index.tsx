import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';

import { addToCart } from '../../redux/slices/cartSlice';
import AppContext from '../../context';
import { EmptyBlock } from '../../components/EmptyBlock';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { fetchFavorites } from '../../redux/slices/favoritesSlice';

import './Favorites.css';

export const Favorites = () => {
	const { animationParent, onAddToFavotites } = React.useContext(AppContext);
	const favoriteItems = useSelector((state: RootState) => state.favorites.favoriteItems);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const fetchData = async () => {
			dispatch(fetchFavorites());
		};
		fetchData();
	}, []);

	return (
		<div className="favorites">
			{favoriteItems.length > 0 ? (
				<>
					<div className="favorites__top">
						<Link to="/">
							<img
								className="favorites__top-arrow"
								src="/svg/arrow-right.svg"
								alt="Arrow"
							/>
						</Link>
						<h2 className="content__h2">Мои закладки</h2>
					</div>
					<div ref={animationParent} className="card-list">
						{favoriteItems.map((item) => (
							<Card
								key={item.id}
								onClickAdd={(obj) => dispatch(addToCart(obj))}
								isFavorite={true}
								onClickFavorite={(obj) => onAddToFavotites(obj)}
								id={item.itemId ?? 0}
								price={item.price}
								title={item.title}
								imageUrl={item.imageUrl}
							/>
						))}
					</div>
				</>
			) : (
				<EmptyBlock
					title={'Закладок нет :('}
					description={'Вы ничего не добавляли в закладки.'}
					image={'/png/emoji-1.png'}
				/>
			)}
		</div>
	);
};
