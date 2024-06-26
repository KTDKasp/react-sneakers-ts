import { Link } from 'react-router-dom';

import { EmptyBlockProps } from './EmptyBlock.props';

import './EmptyBlock.css';

export const EmptyBlock: React.FC<EmptyBlockProps> = ({ title, description, image }) => {
	return (
		<div className="empty-wrapper">
			<img src={image} alt="Emoji" />
			<h2>{title}</h2>
			<p>{description}</p>
			<Link to="/" className="return-homepage">
				<button className="button_green drawer__button_green">
					<img src="/svg/arrow-next.svg" alt="Arrow" />
					Вернуться назад
				</button>
			</Link>
		</div>
	);
};
