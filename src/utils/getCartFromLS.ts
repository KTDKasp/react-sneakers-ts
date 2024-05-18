import { IProduct } from '../interfaces/product.interface';
import { calcSalePrice, calcTotalPrice } from './cartCalculations';

export const getCartFromLS = () => {
	const data = localStorage.getItem('cart');
	const items = data ? JSON.parse(data) : [];
	const totalPrice = calcTotalPrice(items);
	const salePrice = calcSalePrice(items);
	return {
		totalPrice,
		salePrice,
		items: items as IProduct[]
	};
};