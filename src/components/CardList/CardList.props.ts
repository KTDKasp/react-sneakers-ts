import { IProduct } from '../../interfaces/product.interface';

export interface ICardListProps {
	items: IProduct[];
	onAddToCart: (obj: IProduct) => void;
	onAddToFavotites: (obj: IProduct) => void;
}