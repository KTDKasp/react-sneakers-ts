export interface IProduct {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	isFavorite?: boolean;
	itemId?: number;
}