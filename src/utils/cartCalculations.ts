import { IProduct } from '../interfaces/product.interface';

export const calcTotalPrice = (items: IProduct[]) => {
	return items.reduce((sum, item) => sum + item.price, 0);
};

export const calcSalePrice = (items: IProduct[]) => {
	return items.reduce((sum, item) => Math.round(sum + Number(item.price) * 0.05), 0);
};