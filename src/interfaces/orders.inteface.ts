import { IProduct } from './product.interface';

export interface IOrders {
	id: number;
	items: IProduct[];
	total: number;
}