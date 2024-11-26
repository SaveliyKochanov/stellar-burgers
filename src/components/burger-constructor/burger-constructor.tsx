import { BurgerConstructorUI, Preloader } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetConstructor } from '../../services/slices/builder';
import {
  createOrder,
  getOrderModalData,
  getOrderRequest,
  resetOrderModelData
} from '../../services/slices/orders';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderModalData = useSelector(getOrderModalData);
  const orderRequest = useSelector(getOrderRequest);

  const constructorItems = useSelector((state) => state.creator);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      return navigate('/login');
    }

    if (orderRequest) {
      return <Preloader />;
    }

    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(data));
    dispatch(resetConstructor());
  };
  const closeOrderModal = () => {
    dispatch(resetOrderModelData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
