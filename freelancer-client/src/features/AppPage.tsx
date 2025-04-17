/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
// l. 451
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import HomeHeader from 'src/shared/header/components/HomeHeader';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { applicationLogout, getDataFromLocalStorage, saveToSessionStorage } from 'src/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { addAuthUser } from './auth/reducers/auth.reducer';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import { addBuyer } from './buyer/reducers/buyer.reducer';
import { useGetCurrentBuyerByUsernameQuery } from './buyer/services/buyer.service';
import Home from './home/components/Home';
import Index from './index/Index';
import { addSeller } from './sellers/reducers/seller.reducer';
import { useGetSellerByUsernameQuery } from './sellers/services/seller.service';

// const AppPage: FC = (): ReactElement => {
//   // l. 451
//   // const authUser = useAppSelector((state: IReduxState) => state.authUser);
//   // const appLogout = useAppSelector((state: IReduxState) => state.logout);
//   // console.log('authUser: ', authUser);
//   // console.log('appLogout: ', appLogout);
//   // const showCategoryContainer = true;
//   // const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
//   // const { data: currentUserData, isError } = useCheckCurrentUserQuery(undefined, { skip: authUser.id === null });
//   // console.log('currentUserData: ', currentUserData);
//   // console.log('isError: ', isError);
//   return (
//     <div>
//       <Index />
//     </div>
//   );
// };

const AppPage: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const appLogout = useAppSelector((state: IReduxState) => state.logout);
  // l. 512
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer);
  // const showCategoryContainer = true
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { data: currentUserData, isError } = useCheckCurrentUserQuery(undefined, { skip: authUser.id === null });
  const { data: buyerData, isLoading: isBuyerLoading } = useGetCurrentBuyerByUsernameQuery(undefined, { skip: authUser.id === null });

  // l. 483
  const { data: sellerData, isLoading: isSellerLoading } = useGetSellerByUsernameQuery(`${authUser.username}`, {
    skip: authUser.id === null
  });

  // console.log('authUser: ', authUser);
  // console.log('appLogout: ', appLogout);
  const checkUser = useCallback(async () => {
    try {
      if (currentUserData && currentUserData.user && !appLogout) {
        setTokenIsValid(true);
        dispatch(addAuthUser({ authInfo: currentUserData.user }));
        dispatch(addBuyer(buyerData?.buyer));
        dispatch(addSeller(sellerData?.seller));
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
        // l. 519
        const becomeASeller = getDataFromLocalStorage('becomeASeller');
        if (becomeASeller) {
          navigate('/seller_onboarding');
        }

        // l. 568
        if (authUser.username !== null) {
          socket.emit('loggedInUsers', authUser.username);
        }
      }
    } catch (error) {
      console.log('checkUser error:', error);
    }
  }, [currentUserData, navigate, dispatch, appLogout, authUser.username, buyerData, sellerData]);

  // l. 453
  const logoutUser = useCallback(async () => {
    if ((!currentUserData && appLogout) || isError) {
      setTokenIsValid(false);
      applicationLogout(dispatch, navigate);
    }
  }, [currentUserData, dispatch, navigate, appLogout, isError]);

  useEffect(() => {
    checkUser();
    logoutUser();
  }, [checkUser, logoutUser]);

  if (authUser) {
    return !tokenIsValid && !authUser.id ? (
      <Index />
    ) : (
      <>
        {isBuyerLoading && isSellerLoading ? (
          <CircularPageLoader />
        ) : (
          <>
            <HomeHeader showCategoryContainer={showCategoryContainer} />
            <Home />
          </>
        )}
      </>
    );
  } else {
    return <Index />;
  }
};

export default AppPage;
