import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';

import AppContext from '../../context';
import { EmptyBlock } from '../../components/EmptyBlock';

import './Favorites.css';

export const Favorites = () => {
	const { favoriteItems, animationParent, onAddToFavotites, onAddToCart } =
		React.useContext(AppContext);

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
								isAdded={item.isAdded}
								isFavorite={true}
								id={item.itemId}
								price={item.price}
								title={item.title}
								imageUrl={item.imageUrl}
								onClickAdd={(obj) => onAddToCart(obj)}
								onClickFavorite={(obj) => onAddToFavotites(obj)}
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
