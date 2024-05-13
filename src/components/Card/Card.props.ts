import { IProduct } from '../../interfaces/product.interface';

export interface ICardProps {
	id: number;
	isFavorite?: boolean;
	title: string;
	imageUrl: string;
	price: number;
	onClickAdd?: (obj: IProduct) => void;
	onClickFavorite?: (obj: IProduct) => void;
}