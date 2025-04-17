// l. 539
import { FC, ReactElement, useContext } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GigContext } from 'src/features/gigs/context/GigContext';

const GigLeftOverview: FC = (): ReactElement => {
  const { gig, isSuccess, isLoading } = useContext(GigContext);

  return (
    <div className="relative flex max-h-[600px] h-[600px] cursor-pointer justify-center bg-blue-800/20 transition duration-500 ease-in-out hover:scale-[1.02]">
      {!isLoading && isSuccess && (
        <LazyLoadImage
          src={gig.coverImage}
          alt="Gig Image"
          className="w-full h-full object-cover "
          placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
          effect="blur"
        />
      )}
      {isLoading && !isSuccess && (
        <div className="flex h-[600px] w-full">
          <FaCircleNotch className="animate-spin h-12 w-12 lg:h-24 lg:w-20 2xl:h-48 xl:w-48 mr-3" size={40} color="dark:#50b5ff #2c51a0" />
        </div>
      )}
    </div>
  );
};

export default GigLeftOverview;
