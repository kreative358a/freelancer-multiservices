// l. 467
import { FC, ReactElement } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { applicationLogout, lowerCase } from 'src/shared/utils/utils.service';
import { useAppDispatch } from 'src/store/store';

import { IHomeHeaderProps } from '../interfaces/header.interface';
import { updateCategoryContainer } from '../reducers/category.reducer';
import { updateHeader } from '../reducers/header.reducer';

const SettingsDropdown: FC<IHomeHeaderProps> = ({ seller, authUser, buyer, type, setIsDropdownOpen }): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = (): void => {
    if (setIsDropdownOpen) {
      setIsDropdownOpen(false);
    }
    applicationLogout(dispatch, navigate);
  };
  const settings_url = `/${lowerCase(`${seller?.username ? seller?.username : buyer?.username}`)}/edit`;

  return (
    <div className="border-grey w-44 divide-y divide-gray-100 rounded border bg-slate-100 dark:bg-slate-800 shadow-md">
      <ul className="text-gray-700 dark:text-gray-300 py-2 text-sm md:text-base" aria-labelledby="avatarButton">
        {buyer && buyer.isSeller && (
          <li key={'switchBuyerSeller'} className="mx-3 mb-1">
            <Link
              to={`${type === 'buyer' ? `/${lowerCase(`${authUser?.username}`)}/${seller?._id}/seller_dashboard` : '/'}`}
              onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
                dispatch(updateHeader('sellerDashboard'));
                dispatch(updateCategoryContainer(true));
              }}
              className="block w-full cursor-pointer rounded bg-sky-500 px-4s py-2 text-center font-bold  hover:bg-sky-400 focus:outline-none"
            >
              {type === 'buyer' ? 'Switch to Selling' : 'Switch to Buying'}
            </Link>
          </li>
        )}
        {buyer && buyer.isSeller && type === 'buyer' && (
          <li key={'manageGigs'}>
            <Link
              to={`/manage_gigs/new/${seller?._id}`}
              className="block px-4 py-2 hover:text-sky-400 text-slate-800 dark:text-slate-100"
              onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(true));
              }}
            >
              Add a new gig
            </Link>
          </li>
        )}
        {type === 'buyer' && (
          <li key={'dashboardOrders'}>
            <Link
              to={`/users/${buyer?.username}/${buyer?._id}/orders`}
              className="block px-4 py-2 hover:text-sky-400"
              onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(true));
              }}
            >
              Dashboard
            </Link>
          </li>
        )}
        {buyer && buyer.isSeller && type === 'buyer' && (
          <li key={'sellerProfile'}>
            <Link
              to={`/seller_profile/${lowerCase(`${seller?.username}`)}/${seller?._id}/edit`}
              className="block px-4 py-2 hover:text-sky-400"
              onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(true));
              }}
            >
              Profile
            </Link>
          </li>
        )}
        <li key={'userEdit'}>
          <Link
            to={settings_url}
            // `/${lowerCase(`${seller?.username ? seller?.username : buyer?.username}`)}/edit`
            // to={`${lowerCase(`${buyer?.username}/edit`)}`}
            className="block px-4 py-2 hover:text-sky-400"
            onClick={() => {
              if (setIsDropdownOpen) {
                setIsDropdownOpen(false);
              }
              dispatch(updateHeader('home'));
              dispatch(updateCategoryContainer(false));
            }}
          >
            Settings New
          </Link>
        </li>
      </ul>
      <div className="py-1">
        <div onClick={() => onLogout()} className="block px-4 py-2 text-sm xl:text-base hover:text-sky-400">
          Sign out
        </div>
      </div>
    </div>
  );
};

export default SettingsDropdown;
