// l. 615
import { FC, ReactElement } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { IGigsProps, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { rating, replaceSpacesWithDash } from 'src/shared/utils/utils.service';

const GigIndexItem: FC<IGigsProps> = ({ gig }): ReactElement => {
  const gigData: ISellerGig = gig as ISellerGig;
  const title: string = replaceSpacesWithDash(gigData.title);

  return (
    <div
      className="rounded-md outline outline-blue-600/40 hover:scale-[1.02] duration-300"
      // className="rounded outline-blue-500"
    >
      <div
        className="my-2 flex flex-col gap-2"
        // className="mb-8 flex cursor-pointer flex-col gap-2"
      >
        <div className="h-[360px] flex items-center mb-1 border-b bg-blue-600/20 justify-center">
          <Link to={`/gig/${gigData.id}/${title}`}>
            <LazyLoadImage
              src={gigData.coverImage}
              alt="Gig cover image"
              className="w-full rounded-lg"
              placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
              effect="blur"
            />
          </Link>
        </div>
        <div className="p-1 pt-1 bg-blue-600/30">
          <div className="flex items-center gap-2">
            <LazyLoadImage
              // src={gigData.profilePicture !== null ? gigData.profilePicture : 'https://placehold.co/330x220?text=Profile+Image'}
              src={gigData.profilePicture}
              alt="profile"
              className="bg-blue-600/20 h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12 rounded-full object-cover"
              placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
              effect="blur"
            />

            <div className="flex w-full justify-between">
              <span className="text-md hover:underline">
                <strong className="text-sm font-medium md:text-base xl:text-lg hover:underline cursor-pointer">{gigData.username}</strong>
              </span>
            </div>
          </div>
          <div>
            <Link to={`/gig/${gigData.id}/${title}`}>
              <p className="line-clamp-2 text-sm text-gray-700 dark:text-gray-300 hover:underline md:text-base my-1 h-[36px] md:h-[54px]">
                {gigData.basicDescription}
              </p>
            </Link>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            {parseInt(`${gigData.ratingsCount}`) > 0 ? <FaStar /> : <FaRegStar />}
            <strong className="text-sm font-bold">
              ({rating(parseInt(`${gigData.ratingSum}`) / parseInt(`${gigData.ratingsCount}`))})
            </strong>
          </div>
          <div>
            <strong className="text-sm font-bold md:text-base">From ${gigData.price}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigIndexItem;
