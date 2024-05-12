import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { EmptyBlock } from '../../components/EmptyBlock';

import './CartPage.css';

export const CartPage = () => {
	const [orders, setOrders] = React.useState([]);

	const onClickCancel = async () => {
		const res = confirm('Вы действительно хотите удалить заказы?');
		if (res) {
      try {
        const { data } = await axios.patch('https://6d35450ae5876ee3.mokky.dev/orders', [])
        setOrders([]);
        return data;
      } catch (error) {
        console.log(error);
      }
		}
	};

	React.useEffect(() => {
		async function fetchOrders() {
			try {
				const { data } = await axios.get(
					'https://6d35450ae5876ee3.mokky.dev/orders'
				);
				setOrders(data.map((obj) => obj.items).flat());
			} catch (error) {
				console.log(error);
			}
		}

		fetchOrders();
	}, []);

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
					{console.log(orders)}
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
						className="button_green drawer__button_green"
						style={{
							marginTop: 20,
							backgroundColor: '#f01a21',
							maxWidth: 'fit-content',
						}}
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
