import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getAllOrders, getOrders } from '../../services/slices/orders';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
