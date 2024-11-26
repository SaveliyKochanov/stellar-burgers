import { Preloader, ProfileMenuUI } from '@ui';
import { RequestStatus } from '@utils-types';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserLoading, logoutUser } from '../../services/slices/user';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const status = useSelector(getUserLoading);

  if (status === RequestStatus.Loading) return <Preloader />;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
