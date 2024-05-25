import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { EmptyBlock } from '../../components/EmptyBlock';

import './CartPage.css';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { deleteAllOrders, fetchOrders } from '../../redux/slices/orderSlice';

export const CartPage = () => {
	const orders = useSelector((state: RootState) => state.orders.orders);
	const dispatch = useAppDispatch();

	const onClickCancel = async () => {
		const res = confirm('Вы действительно хотите удалить заказы?');
		if (res) {
			dispatch(deleteAllOrders());
		}
	};

	React.useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	return (
		<div className="cart">
			{orders.length > 0 ? (
				<>
					<div className="cart__top">
						<Link to="/">
							<img
								className="cart__top-arrow"
								src="/svg/arrow-right.svg"
								alt="Arrow"
							/>
						</Link>
						<h2 className="content__h2">Мои покупки</h2>
					</div>
					<div className="card-list">
						{orders.map((item, index) => (
							<Card
								key={index}
								id={item.id}
								price={12990}
								title={item.title}
								imageUrl={item.imageUrl}
							/>
						))}
					</div>
					<button
						className="red_delete button_green drawer__button_green"
            onClick={onClickCancel}
					>
						Удалить все заказы
					</button>
				</>
			) : (
				<EmptyBlock
					title={'У вас нет заказов'}
					description={'Вы нищеброд? Оформите хотя бы один заказ.'}
					image={'/png/emoji-2.png'}
				/>
			)}
		</div>
	);
};
