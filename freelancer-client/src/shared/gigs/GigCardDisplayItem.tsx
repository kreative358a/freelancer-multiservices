// l. 545
import { find } from 'lodash';
import { FC, ReactElement, useEffect, useRef } from 'react';
import { FaPencilAlt, FaRegStar, FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { IGigCardItems, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { rating, replaceAmpersandAndDashWithSpace } from 'src/shared/utils/utils.service';
import { socket, socketService } from 'src/sockets/socket.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { lowerCase, replaceSpacesWithDash } from '../utils/utils.service';

const GigCardDisplayItem: FC<IGigCardItems> = ({ gig, linkTarget, showEditIcon }): ReactElement => {
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const sellerUsername = useRef<string>('');
  const title: string = replaceSpacesWithDash(gig.title);
  const navigate: NavigateFunction = useNavigate();

  const navigateToEditGig = (gigId: string): void => {
    navigate(`/manage_gigs/edit/${gigId}`, { state: gig });
  };

  // l. 568
  const saveGigTitle = (gig: ISellerGig): void => {
    if (authUser?.username) {
      const category: string = replaceAmpersandAndDashWithSpace(gig.categories);
      socket.emit('category', category, authUser.username);
    }
  };

  // l. 568
  useEffect(() => {
    socketService.setupSocketConnection();
    socket.emit('getLoggedInUsers', '');
    socket.on('online', (data: string[]) => {
      sellerUsername.current = find(data, (name: string) => name === gig.username) as string;
    });
  }, [authUser.username, gig.username]);

  return (
    <div className="my-2 rounded-md outline outline-blue-600/40 hover:scale-[1.02] duration-300">
      <div className="mb-2 flex flex-col gap-2">
        <div className="h-[380px] flex items-center mb-1 border-b bg-blue-600/20 justify-center">
          <Link
            to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`}
            onClick={() => saveGigTitle(gig)}
            className="cursor-pointer"
          >
            <LazyLoadImage
              src={gig.coverImage}
              alt="Gig cover image"
              className="w-full rounded-md bg-blue-600/20 max-h-[360px]"
              wrapperClassName="bg-center"
              placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
              effect="opacity"
            />
          </Link>
        </div>
        <div className="p-1 pt-1 bg-blue-600/30">
          <div className="flex items-center gap-2">
            <LazyLoadImage
              // src={gig.profilePicture !== null ? gig.profilePicture : 'https://placehold.co/330x220?text=Profile+Image'}
              src={gig.profilePicture}
              alt="Profile image"
              className="bg-blue-600/20 h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12 rounded-full object-cover"
              wrapperClassName="bg-center"
              placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
              effect="opacity"
            />
            {sellerUsername.current === gig.username && (
              <span className="absolute ml-[30px] mt-[30px] w-2.5 h-2.5 md:w-2.5 md:h-2.5 xl:w-2.5 xl:h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
            )}
            <div className="flex w-full justify-between">
              <span className="text-base">
                {linkTarget ? (
                  <Link
                    to={`/seller_profile/${lowerCase(`${gig.username}`)}/${gig.sellerId}/${
                      seller.username === gig.username ? 'edit' : 'view'
                    }`}
                  >
                    <strong className="text-sm font-medium md:text-base xl:text-lg hover:underline cursor-pointer">{gig.username}</strong>
                  </Link>
                ) : (
                  <strong className="text-sm font-medium md:text-base xl:text-lg">{gig.username}</strong>
                )}
              </span>
              {showEditIcon && (
                <span className="hover:outline hover:outline-1 rounded-full p-1.5 mr-2 cursor-pointer">
                  <FaPencilAlt className=" flex self-center" size={15} onClick={() => navigateToEditGig(`${gig.id}`)} />
                </span>
              )}
            </div>
          </div>
          <div>
            <Link to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`} onClick={() => saveGigTitle(gig)}>
              <p className="line-clamp-2 text-sm text-gray-700 dark:text-gray-300 hover:underline md:text-base my-1 h-[36px] md:h-[54px]">
                {gig.basicDescription}
              </p>
            </Link>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            {parseInt(`${gig.ratingsCount}`) > 0 ? <FaStar /> : <FaRegStar />}
            <strong className="text-sm font-bold">({rating(parseInt(`${gig.ratingSum}`) / parseInt(`${gig.ratingsCount}`))})</strong>
          </div>
          <div className="mt-1">
            <strong className="text-sm font-bold md:text-base">From ${gig.price}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCardDisplayItem;
