import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getAllOrders, getOrders } from '../../services/slices/orders';
import { getUserLoading } from '../../services/slices/user';
import { useDispatch, useSelector } from '../../services/store';
import { RequestStatus } from '@utils-types'
import { Preloader } from '@ui'

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
