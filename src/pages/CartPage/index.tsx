import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { EmptyBlock } from '../../components/EmptyBlock';

import { IProduct } from '../../interfaces/product.interface';
import { IOrders } from '../../interfaces/orders.inteface';
import './CartPage.css';

export const CartPage = () => {
	const [orders, setOrders] = React.useState<IProduct[]>([]);

	const onClickCancel = async () => {
		const res = confirm('Вы действительно хотите удалить заказы?');
		if (res) {
      try {
        const { data } = await axios.patch<IOrders>('https://6d35450ae5876ee3.mokky.dev/orders', []);
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
				const { data } = await axios.get<IOrders[]>(
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
