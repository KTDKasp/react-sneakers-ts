import React from 'react';

import AppContext from '../../context';

import './Card.css';
import { ICardProps } from './Card.props';

export const Card: React.FC<ICardProps> = ({
	id,
	imageUrl,
	price,
	title,
	isFavorite = false,
	onClickAdd,
	onClickFavorite
}) => {
	const [isFavoriteCard, setIsFavoriteCard] = React.useState(isFavorite);

	const { isItemAdded } = React.useContext(AppContext);

	const onClickAddBtn = () => {
		if (onClickAdd) {
			onClickAdd({ id, imageUrl, price, title, isFavorite });
		}
	};

	const onClickFavoriteBtn = () => {
		setIsFavoriteCard(!isFavoriteCard);
		if (onClickFavorite) {
			onClickFavorite({ id, imageUrl, price, title, isFavorite });
		}
	};

	return (
		<div className="card-item">
			<div className="card__top">
				{onClickFavorite && (
					<img
						onClick={() => onClickFavoriteBtn()}
						className="card__fav"
						src={isFavoriteCard ? '/svg/like-2.svg' : '/svg/like-1.svg'}
						alt="Unliked"
					/>
				)}
				<img className="card__img" src={imageUrl} alt="Sneaker" />
			</div>
			<p>{title}</p>
			<div className="card__bottom">
				<div className="card__bottom-price">
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				{onClickAdd && (
					<img
						onClick={() => onClickAddBtn()}
						className="card__add"
						src={isItemAdded && isItemAdded(id) ? '/svg/checked.svg' : '/svg/plus.svg'}
						alt="Plus"
					/>
				)}
			</div>
		</div>
	);
};
