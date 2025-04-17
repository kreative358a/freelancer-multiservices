// l. 492
import { FC, ReactElement } from 'react';
import { IProfileTabsProps } from 'src/features/sellers/interfaces/seller.interface';
import Dropdown from 'src/shared/dropdown/Dropdown';

const ProfileTabs: FC<IProfileTabsProps> = ({ type, setType }): ReactElement => {
  return (
    <>
      <div
        // className="sm:hidden rounded-sm text-sm xl:text-base bg-white border-grey"
        className="sm:hidden rounded-sm text-sm min-[540px]:text-base bg-white border-grey"
      >
        <Dropdown text={type} maxHeight="300" values={['Overview', 'Active Gigs', 'Ratings & Reviews']} setValue={setType} />
      </div>
      <ul className="hidden divide-x divide-gray-200 text-center text-sm sm:text-base xl:text-lg font-medium shadow sm:flex">
        <li className="w-full">
          <div
            onClick={() => {
              if (setType) {
                setType('Overview');
              }
            }}
            className={`inline-block w-full p-4 hover:text-blue-600/80 focus:outline-none text-sm sm:text-base xl:text-lg
              ${type === 'Overview' ? 'bg-sky-400/20' : 'bg-sky-200/20'}
            `}
          >
            Overview
          </div>
        </li>
        <li className="w-full">
          <div
            onClick={() => {
              if (setType) {
                setType('Active Gigs');
              }
            }}
            className={`inline-block w-full border-l border-r p-4 hover:text-blue-600/80 focus:outline-none text-sm sm:text-base xl:text-lg
              ${type === 'Active Gigs' ? 'bg-sky-400/20' : 'bg-sky-200/20'}
            `}
          >
            Active Gigs
          </div>
        </li>
        <li className="w-full">
          <div
            onClick={() => {
              if (setType) {
                setType('Ratings & Reviews');
              }
            }}
            className={`inline-block w-full p-4 hover:text-blue-600/80 focus:outline-none text-sm sm:text-base xl:text-lg
              ${type === 'Ratings & Reviews' ? 'bg-sky-400/20' : 'bg-sky-200/20'}
            `}
          >
            Ratings & Reviews
          </div>
        </li>
      </ul>
    </>
  );
};

export default ProfileTabs;
