import { FC, ReactNode, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import AppPage from './features/AppPage';
import ConfirmEmail from './features/auth/components/ConfirmEmail';
import ResetPassword from './features/auth/components/ResetPassword';
// import VerifyOTP from './features/auth/components/VerifyOTP'; //  l. 648
import BuyerDashboard from './features/buyer/components/Dashboard';
import Chat from './features/chat/components/Chat';
import Error from './features/error/Error';
import AddGig from './features/gigs/components/gig/AddGig';
import EditGig from './features/gigs/components/gig/EditGig';
import Gigs from './features/gigs/components/gigs/Gigs';
import GigView from './features/gigs/components/view/GigView';
import Home from './features/home/components/Home';
import GigInfoDisplay from './features/index/gig-tabs/GigInfoDisplay';
import GigsIndexDisplay from './features/index/gig-tabs/GigsIndexDisplay';
import Checkout from './features/order/components/Checkout';
import Order from './features/order/components/Order';
import Requirement from './features/order/components/Requirement';
import ProtectedRoute from './features/ProtectedRoute';
import AddSeller from './features/sellers/components/add/AddSeller';
import ManageEarnings from './features/sellers/components/dashboard/ManageEarnings';
import ManageOrders from './features/sellers/components/dashboard/ManageOrders';
import Seller from './features/sellers/components/dashboard/Seller';
import SellerDashboard from './features/sellers/components/dashboard/SellerDashboard';
import CurrentSellerProfile from './features/sellers/components/profile/CurrentSellerProfile';
import SellerProfile from './features/sellers/components/profile/SellerProfile';
import Settings from './features/settings/components/Settings';

const Layout = ({ backgroundColor = 'transparent', children }: { backgroundColor: string; children: ReactNode }): JSX.Element => (
  <div style={{ backgroundColor }} className="flex flex-grow bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2">
    {children}
  </div>
);

const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: 'reset_password',
      element: (
        <Suspense>
          <ResetPassword />
        </Suspense>
      )
    },
    {
      path: 'confirm_email',
      element: (
        <Suspense>
          <ConfirmEmail />
        </Suspense>
      )
    },
    // {
    //   path: 'verify_otp',
    //   element: (
    //     <Suspense>
    //       <VerifyOTP />
    //     </Suspense>
    //   )
    // },
    {
      path: '/search/categories/:category',
      element: (
        <Suspense>
          <Layout backgroundColor="">
            <GigsIndexDisplay type="categories" />
          </Layout>
        </Suspense>
      )
    },
    {
      path: '/gigs/search',
      element: (
        <Suspense>
          <Layout backgroundColor="">
            <GigsIndexDisplay type="search" />
          </Layout>
        </Suspense>
      )
    },
    {
      path: '/gig/:gigId/:title',
      element: (
        <Suspense>
          <Layout backgroundColor="">
            <GigInfoDisplay />
          </Layout>
        </Suspense>
      )
    },
    {
      path: '/',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Home />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/users/:username/:buyerId/orders',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <BuyerDashboard />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      // l. 471
      path: '/seller_onboarding',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <AddSeller />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/seller_profile/:username/:sellerId/edit',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <CurrentSellerProfile />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/seller_profile/:username/:sellerId/view',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <SellerProfile />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      // l. 511
      path: '/:username/:sellerId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Seller />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: 'seller_dashboard',
          element: <SellerDashboard />
        },
        {
          path: 'manage_orders',
          element: <ManageOrders />
        },
        {
          path: 'manage_earnings',
          element: <ManageEarnings />
        }
      ]
    },
    {
      path: '/manage_gigs/new/:sellerId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <AddGig />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/manage_gigs/edit/:gigId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <EditGig />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/gig/:username/:title/:sellerId/:gigId/view',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <GigView />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/categories/:category',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Gigs type="categories" />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/search/gigs',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Gigs type="search" />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/inbox',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Chat />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/inbox/:username/:conversationId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Chat />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/gig/checkout/:gigId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Checkout />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/gig/order/requirement/:gigId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Requirement />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/orders/:orderId/activities',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Order />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/:username/edit',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="">
              <Settings />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '*',
      element: (
        <Suspense>
          <Error />
        </Suspense>
      )
    }
  ];

  return useRoutes(routes);
};

export default AppRouter;
