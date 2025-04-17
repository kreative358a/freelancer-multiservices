// l. 497
import { FC, ReactElement, useContext } from 'react';
import { FaMapMarkerAlt, FaRegClock, FaUserAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { TimeAgo } from 'src/shared/utils/timeago.utils';

const AboutMe: FC = (): ReactElement => {
  const { sellerProfile } = useContext(SellerContext);

  return (
    <>
      {sellerProfile ? (
        <div className="border-grey border bg-blue-600/10 mt-6">
          <div className="mb-1 flex justify-between border-b">
            <h4 className="flex py-2.5 pl-3.5 text-sm font-bold  md:text-base">ABOUT ME</h4>
          </div>
          <ul className="mb-0 list-none py-2">
            <li className="flex justify-between text-sm md:text-base mb-1">
              <div className="col-span-3 ml-3 flex pb-2">
                <FaMapMarkerAlt className="mr-2 mt-1" />
                <div className="mr-3 font-bold">From</div>
              </div>
              <div className="mr-4">{sellerProfile.country}</div>
            </li>
            <li className="flex justify-between text-sm md:text-base mb-1">
              <div className="col-span-3 ml-3 flex pb-2">
                <FaUserAlt className="mr-2 mt-1" />
                <div className="mr-3 font-bold">Member since</div>
              </div>
              <div className="mr-4">{TimeAgo.formatDateToMonthAndYear(`${sellerProfile.createdAt}`)}</div>
            </li>
            <li className="flex justify-between text-sm md:text-base mb-0">
              <div className="col-span-3 ml-3 flex pb-2">
                <FaRegClock className="mr-2 mt-1" />
                <div className="mr-3 font-bold">Avg. Response Time</div>
              </div>
              <div className="mr-4">
                {sellerProfile.responseTime} hour{sellerProfile.responseTime === 1 ? '' : 's'}
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AboutMe;
