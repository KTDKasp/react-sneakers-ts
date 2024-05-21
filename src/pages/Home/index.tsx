import React from 'react';
import debounce from 'lodash.debounce';

import { CardList } from '../../components/CardList';
import { addToCart } from '../../redux/slices/cartSlice';
import { RootState, useAppDispatch } from '../../redux/store';

import './Home.css';
import { addToFavotites, removeFromFavorites } from '../../redux/slices/favoritesSlice';
import { useSelector } from 'react-redux';
import { fetchSneakers, setSearchValue, setSortType } from '../../redux/slices/sneakersItemsSlice';

export const Home = () => {
	const [inputValue, setInputValue] = React.useState<string>('');
	const items = useSelector((state: RootState) => state.sneakers.items);
	const searchValue = useSelector((state: RootState) => state.sneakers.searchValue);
	const sortType = useSelector((state: RootState) => state.sneakers.sortType);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(fetchSneakers({ searchValue, sortType }));
	}, [searchValue, sortType, dispatch]);

	const updateInputValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 500),
 [dispatch]);

 const onClickClear = () => {
	dispatch(setSearchValue(''));
	setInputValue('');
 };


	const onChangeSelect = debounce((event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSortType(event.target.value));
	}, 250);

	const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		updateInputValue(event.target.value);
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
							value={inputValue}
							onChange={(event) => onChangeSearchInput(event)}
						/>
						{inputValue && (
							<img
								onClick={onClickClear}
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
					onAddToFavotites={(obj) => dispatch(addToFavotites(obj))}
					onRemoveFromFavorites={(obj) => dispatch(removeFromFavorites(obj))}
				/>
			}
		</div>
	);
};
