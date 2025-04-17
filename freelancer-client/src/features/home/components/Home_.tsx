// l. 457
import { FC, ReactElement, useEffect } from 'react';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
// import { useGetGigsByCategoryQuery, useGetTopRatedGigsByCategoryQuery } from 'src/features/gigs/services/gigs.service';
import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interface';
import { useGetRandomSellersQuery } from 'src/features/sellers/services/seller.service';
import TopGigsView from 'src/shared/gigs/TopGigsView';
import { lowerCase } from 'src/shared/utils/utils.service';
import { socketService } from 'src/sockets/socket.service';
// import { useAppSelector } from 'src/store/store';
// import { IReduxState } from 'src/store/store.interface';

import FeaturedExperts from './FeaturedExperts';
import HomeGigsView from './HomeGigsView';
import HomeSlider from './HomeSlider';
import HomeGigsViewPlaceholder from './HomeGigsViewPlaceholder'; // Placeholder
import FeaturedExpertsPlaceholder from './FeaturedExpertsPlaceholder';

const Home: FC = (): ReactElement => {
  // const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const { data, isSuccess } = useGetRandomSellersQuery('10'); // l. 520
  // const { data: categoryData, isSuccess: isCategorySuccess } = useGetGigsByCategoryQuery(`${authUser.username}`);
  // const { data: topGigsData, isSuccess: isTopGigsSuccess } = useGetTopRatedGigsByCategoryQuery(`${authUser.username}`);
  // const { data: sellerData, isSuccess: isSellerDataSuccess } = useGetMoreGigsLikeThisQuery('6559d9a3620b7db8c1fb7f01');
  let sellers: ISellerDocument[] = [];
  let categoryGigs: ISellerGig[] = [];
  let topGigs: ISellerGig[] = [];

  // l. 520
  if (isSuccess) {
    sellers = data.sellers as ISellerDocument[];
    console.log('isSuccess sellers: ', sellers);
  }

  if (!isSuccess) {
    sellers = data?.sellers as ISellerDocument[];
    console.log('!isSuccess sellers: ', sellers);
  }

  // if (isCategorySuccess) {
  //   categoryGigs = categoryData.gigs as ISellerGig[];
  // }

  // if (isTopGigsSuccess) {
  //   topGigs = topGigsData.gigs as ISellerGig[];
  // }

  // if (isSellerDataSuccess) {
  //   topGigs = sellerData.gigs as ISellerGig[];
  // }

  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <div className="m-auto px-6 w-screen relative min-h-screen xl:container 2xl:w-full md:px-10 lg:px-6 xl:px-4">
      <HomeSlider />
      {topGigs.length > 0 && (
        <TopGigsView
          gigs={topGigs}
          title="Top rated services in"
          subTitle=""
          // subTitle={`Highest rated talents for all your ${lowerCase(topGigs[0].categories)} needs.`}
          // category={topGigs[0].categories}
          category="Programming & Tech"
          width="w-72"
          type="home"
        />
      )}
      {categoryGigs.length > 0 && (
        // <HomeGigsView gigs={categoryGigs} title="Because you viewed a gig on" subTitle="" category={categoryGigs[0].categories} />
        <HomeGigsView
          gigs={[]}
          title="Because you viewed a gig on"
          subTitle=""
          // category={categoryGigs[0].categories}
          category="Programming & Tech"
        />
      )}
      {/* <FeaturedExperts sellers={sellers} /> */}
      <h1 className="text-center text-3xl">/*TEST COMPONENTS*/</h1>
      <HomeGigsViewPlaceholder gigs={[]} title="Because you viewed a gig on" subTitle="" category="Programming & Tech" />
      <FeaturedExpertsPlaceholder sellers={sellers} />
    </div>
  );
};

export default Home;
