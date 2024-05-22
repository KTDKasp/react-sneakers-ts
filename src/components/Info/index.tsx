import React from 'react';
import { InfoProps } from './Info.props';
import { useAppDispatch } from '../../redux/store';
import { toggleDrawer } from '../../redux/slices/cartSlice';

export const Info: React.FC<InfoProps> = ({ title, description, image, onClickClose }) => {
  const dispatch = useAppDispatch();

  const onClickCloseInfo = () => {
    dispatch(toggleDrawer(false));
    onClickClose();
  };

  return (
    <div className='drawer__empty'>
      <img width="120px" src={image} alt="Empty Cart" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClickCloseInfo} className="button_green drawer__button_green">
        <img src="/svg/arrow-next.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};
