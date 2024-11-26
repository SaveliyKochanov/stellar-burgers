import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import {
  removeFromConstructor,
  reorderConstructor
} from '../../services/slices/builder';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(
        reorderConstructor({
          from: index,
          to: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        reorderConstructor({
          from: index,
          to: index - 1
        })
      );
    };

    const handleClose = () => {
      dispatch(removeFromConstructor(Number(ingredient.id)));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
