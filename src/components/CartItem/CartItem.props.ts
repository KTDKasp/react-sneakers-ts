export interface ICartItemProps {
	title: string;
	price: number;
	imageUrl: string;
	onRemove: () => void;
}