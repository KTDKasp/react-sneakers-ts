import React from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

import AppContext from '../../context';
import { CardList } from '../../components/CardList';
import { IProduct } from '../../interfaces/product.interface';
import { addToCart } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../redux/store';

import './Home.css';

interface ISearchParams {
	sortBy: string;
	title?: string;
}

export const Home = () => {
	const [sortType, setSortType] = React.useState<string>('title');
	const [searchValue, setSearchValue] = React.useState<string>('');
	const { items, setItems, onAddToFavotites } = React.useContext(AppContext);
	const dispatch = useAppDispatch();

	const fetchData = React.useCallback(async () => {
		const params: ISearchParams = {
			sortBy: sortType
		};

		if (searchValue) {
			params.title = `*${searchValue}*`;
		}

		// #TODO: сделать скелетон не при каждом обновлении
		try {
			const { data } = await axios.get<IProduct[]>(
				'https://6d35450ae5876ee3.mokky.dev/items',
				{
					params
				}
			);
			if (setItems) {
				setItems(data);
			}
		} catch (error) {
			console.log(`Hey, you have ${error}`);
		}
	}, [searchValue, sortType]);

	React.useEffect(() => {
		async function onMount() {
			await fetchData();
		}
		onMount();
	}, [fetchData]);

	const onChangeSelect = debounce((event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortType(event.target.value);
	}, 250);

	const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	return (
		<div className="main">
			<div className="main__slider"></div>
			<div className="search">
				<h2 className="content__h2">Все кроссовки</h2>
				<div className="search-and-sort">
					<select onChange={onChangeSelect} className="sort__type">
						<option value="title">По названию</option>
						<option value="price">По цене (дешевые)</option>
						<option value="-price">По цене (дорогие)</option>
					</select>
					<div className="search__block">
						<img className="search__img" src="/svg/search.svg" alt="Search" />
						<input
							className="search__input"
							type="text"
							placeholder="Поиск..."
							value={searchValue}
							onChange={(event) => onChangeSearchInput(event)}
						/>
						{searchValue && (
							<img
								onClick={() => setSearchValue('')}
								className="search__clear"
								src="/svg/close.svg"
								alt="Clear"
							/>
						)}
					</div>
				</div>
			</div>
			{
				<CardList
					items={items}
					onAddToCart={(obj) => dispatch(addToCart(obj))}
					onAddToFavotites={onAddToFavotites}
				/>
			}
		</div>
	);
};
