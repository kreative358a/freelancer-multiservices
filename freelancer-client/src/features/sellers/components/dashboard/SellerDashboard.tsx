// l. 511
import { FC, ReactElement } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Button from 'src/shared/button/Button';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import { useAppDispatch } from 'src/store/store';

import { ISellerDocument, SellerContextType } from '../../interfaces/seller.interface';
import ProfileHeader from '../profile/components/ProfileHeader';
import DashboardMain from './components/DashboardMain';

// l. 517
const SellerDashboard: FC = (): ReactElement => {
  const { seller } = useOutletContext<SellerContextType>();
  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="mt-10 flex flex-col justify-between gap-y-4">
        <ProfileHeader showHeaderInfo={false} showEditIcons={false} sellerProfile={seller as ISellerDocument} />
        <div className="self-end">
          <span>
            {/* <Button
              className="absolute text-transparent bg-gradient-to-r from-blue-700 from-10% via-orange-500 via-60%  to-green-500 to-90% rounded text-center text-sm font-semibold focus:outline-none md:px-3 md:py-2 md:text-base xl:text-lg transition duration-400 hover:bg-gradient-to-l animate-ping hover:animate-none"
              label={'Create a new gig'}
            /> */}
            <Button
              onClick={() => dispatch(updateHeader('home'))}
              className="animate-pulse relative z-20 bg-gradient-to-r from-blue-700 from-10% via-orange-500 via-60%  to-green-500 to-90% rounded text-center text-sm font-semibold focus:outline-none md:px-3 md:py-2 md:text-base xl:text-lg transition duration-400 hover:bg-gradient-to-l hover:animate-none"
              // className="bg-gradient-to-r from-blue-700 via-orange-500 to-green-500 w-full rounded text-center text-sm font-semibold focus:outline-none md:px-3 md:py-2 md:text-base xl:text-lg"
              // className="bg-green-transparent w-full rounded text-center text-sm font-semibold text-green-500 hover:text-green-600 focus:outline-none md:bg-green-500 md:px-3 md:py-2 md:text-base xl:text-lg md:text-white hover:md:bg-green-600 hover:md:text-white"
              label={<Link to={`/manage_gigs/new/${seller?._id}`}>Create a new gig</Link>}
            />
          </span>
        </div>
      </div>
      <DashboardMain />
    </div>
  );
};

export default SellerDashboard;
