// l. 511
import { FC, ReactElement } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { useGetGigsBySellerIdQuery, useGetSellerPausedGigsQuery } from 'src/features/gigs/services/gigs.service';
import { IOrderDocument } from 'src/features/order/interfaces/order.interface';
import { useGetOrdersBySellerIdQuery } from 'src/features/order/services/order.service';
import DashboardHeader from 'src/shared/header/components/DashboardHeader';

import { ISellerDocument } from '../../interfaces/seller.interface';
import { useGetSellerByIdQuery } from '../../services/seller.service';

const Seller: FC = (): ReactElement => {
  // l. 513
  const { sellerId } = useParams<string>();

  // l. 513
  const { data, isSuccess } = useGetSellerByIdQuery(`${sellerId}`);

  // l. 555
  const { data: sellerGigs, isSuccess: isSellerGigsSuccess } = useGetGigsBySellerIdQuery(`${sellerId}`);

  // l. 555
  const { data: sellerPausedGigs, isSuccess: isSellerPausedGigsSuccess } = useGetSellerPausedGigsQuery(`${sellerId}`);

  // l. 604
  const { data: sellerOrders, isSuccess: isSellerOrdersSuccess } = useGetOrdersBySellerIdQuery(`${sellerId}`);

  // l. 513
  let gigs: ISellerGig[] = [];
  let pausedGigs: ISellerGig[] = [];
  let orders: IOrderDocument[] = [];
  let seller: ISellerDocument | undefined = undefined;

  if (isSuccess) {
    seller = data?.seller as ISellerDocument;
  }

  if (isSellerGigsSuccess) {
    gigs = sellerGigs?.gigs as ISellerGig[];
  }

  if (isSellerPausedGigsSuccess) {
    pausedGigs = sellerPausedGigs?.gigs as ISellerGig[];
  }

  // l. 604
  if (isSellerOrdersSuccess) {
    orders = sellerOrders?.orders as IOrderDocument[];
  }

  return (
    <div className="relative w-screen">
      <DashboardHeader />
      <div className="m-auto px-6 w-screen xl:container md:px-10 lg:px-6 xl:px-4 relative min-h-screen">
        {/* We are using this outlet because in the routes,
         we set up the children to the main route paths. */}
        <Outlet context={{ seller, gigs, pausedGigs, orders }} />
      </div>
    </div>
  );
};

export default Seller;
