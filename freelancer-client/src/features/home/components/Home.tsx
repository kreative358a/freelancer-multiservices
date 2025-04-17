// l. 457
import { FC, ReactElement, useEffect } from 'react';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import {
  useGetGigsByCategoryQuery,
  useGetTopRatedGigsByCategoryQuery,
  useGetMoreGigsLikeThisQuery
} from 'src/features/gigs/services/gigs.service';
import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interface';
import { useGetRandomSellersQuery } from 'src/features/sellers/services/seller.service';
import TopGigsView from 'src/shared/gigs/TopGigsView';
import { lowerCase } from 'src/shared/utils/utils.service';
import { socketService } from 'src/sockets/socket.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import FeaturedExperts from './FeaturedExperts';
import HomeGigsView from './HomeGigsView';
import HomeSlider from './HomeSlider';
// import HomeGigsViewPlaceholder from './HomeGigsViewPlaceholder'; // Placeholder
// import FeaturedExpertsPlaceholder from './FeaturedExpertsPlaceholder';

const Home: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const { data, isSuccess } = useGetRandomSellersQuery('10'); // l.
  const { data: categoryData, isSuccess: isCategorySuccess } = useGetGigsByCategoryQuery(`${authUser.username}`);

  const { data: topGigsData, isSuccess: isTopGigsSuccess } = useGetTopRatedGigsByCategoryQuery(`${authUser.username}`); // l. 553

  const { data: sellerData, isSuccess: isSellerDataSuccess } = useGetMoreGigsLikeThisQuery('67f3be0a9dcf876b732dc336');
  // l. 554 seller 67f3be0a9dcf876b732dc336 / gig 67f5510ac0801ff95a2a725c

  let sellers: ISellerDocument[] = [];
  let categoryGigs: ISellerGig[] = [];
  let topGigs: ISellerGig[] = [];
  let topGigsTest: ISellerGig[] = []; // l. 554

  if (isSuccess) {
    sellers = data.sellers as ISellerDocument[];
    console.log('isSuccess sellers.length: ', sellers.length);
  }

  // if (!isSuccess) {
  //   console.log('!isSuccess sellers: ', sellers);
  // }

  if (isCategorySuccess) {
    categoryGigs = categoryData.gigs as ISellerGig[];
    console.log('isCategorySuccess categoryGigs.length: ', categoryGigs.length);
  }

  if (isTopGigsSuccess) {
    topGigs = topGigsData.gigs as ISellerGig[];
    console.log('isTopGigsSuccess topGigs.length: ', topGigs.length);
  }

  if (isSellerDataSuccess) {
    topGigsTest = sellerData.gigs as ISellerGig[];
    // topGigs = sellerData.gigs as ISellerGig[];
  }

  // l. 567
  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <div className="m-auto px-6 w-screen relative min-h-screen xl:container 2xl:w-full md:px-10 lg:px-6 xl:px-4">
      <HomeSlider />

      {/* {topGigs.length > 0 && (
        <TopGigsView
          gigs={topGigs}
          title="Top rated services in"
          subTitle={`Highest rated talents for all your ${lowerCase(topGigs[0].categories)} needs.`}
          category={topGigs[0].categories}
          width="w-72"
          type="home"
        />
      )} */}
      {topGigs.length > 0 ? (
        <TopGigsView
          gigs={topGigs}
          title="Top rated services in"
          subTitle={`Highest rated talents for all your ${lowerCase(topGigs[0].categories)} needs.`}
          category={topGigs[0].categories}
          width="w-72"
          type="home"
        />
      ) : (
        <>
          <h1 className="text-center text-3xl">/ TOP GIGS VIEW /</h1>
          <TopGigsView
            gigs={topGigsTest}
            // gigs={categoryGigs}
            title="TEST Top rated services in"
            subTitle={`Highest rated talents for all your ${lowerCase('Programming & Tech')} needs.`}
            // subTitle={`Highest rated talents for all your ${lowerCase(topGigs[0].categories)} needs.`}
            category="Programming & Tech"
            // category={categoryGigs[0].categories}
            width="w-72"
            type="home"
          />
        </>
      )}

      <h1 className="text-center text-3xl">/ HOME GIGS VIEW /</h1>
      {categoryGigs.length > 0 && (
        <HomeGigsView
          //
          gigs={categoryGigs}
          title="Because you viewed a gig on"
          subTitle=""
          category={categoryGigs[0].categories}
        />
      )}
      <FeaturedExperts sellers={sellers} />
      <h1 className="text-center text-3xl">/ TEST COMPONENTS /</h1>
      {/*  <HomeGigsViewPlaceholder gigs={[]} title="Because you viewed a gig on" subTitle="" category="Programming & Tech" /> */}
      {/* <FeaturedExpertsPlaceholder sellers={sellers} /> */}
    </div>
  );
};

export default Home;
