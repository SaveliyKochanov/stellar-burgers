import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import {
  getAllFeeds,
  getFeeds,
  getIsLoading
} from '../../services/slices/feeds';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const fetchFeeds = useCallback(() => dispatch(getFeeds()), [dispatch]);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    fetchFeeds();
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getAllFeeds);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        fetchFeeds();
      }}
    />
  );
};
