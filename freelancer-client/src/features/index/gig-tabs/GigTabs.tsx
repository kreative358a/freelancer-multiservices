// l. 423
import { FC, ReactElement, useState } from 'react';
import { useGetAuthGigsByCategoryQuery } from 'src/features/auth/services/auth.service';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import TopGigsView from 'src/shared/gigs/TopGigsView';
import { categories, lowerCase, replaceAmpersandAndDashWithSpace, replaceSpacesWithDash } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

const GigTabs: FC = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<string>('Programming & Tech');

  // l. 615
  const queryType = `query=${replaceAmpersandAndDashWithSpace(`${lowerCase(activeTab)}`)}`;
  const { data, isSuccess } = useGetAuthGigsByCategoryQuery({
    query: `${queryType}`,
    from: '0',
    size: '10',
    type: 'forward'
  });
  let categoryGigs: ISellerGig[] = [];
  if (isSuccess) {
    categoryGigs = data.gigs as ISellerGig[];
  }

  return (
    <div className="relative bg-slate-200 dark:bg-slate-800 m-auto border-t-[20px] border-gray-400 dark:border-gray-700 w-screen px-6 md:px-10 lg:px-14 xl:px-12 2xl:px-20">
      <div className="mx-auto flex flex-col px-4 py-8 lg:px-6 lg:py-10">
        <div className="flex flex-col text-left text-gray-800 dark:text-gray-400">
          <h2 className="mb-3 text-2xl xl:text-3xl font-bold">A broad selection of services</h2>
          <h4 className="text-gray-800 dark:text-gray-400">
            Choose from a broad selection of services from expert freelancers for your next project.
          </h4>
        </div>
        <div className="mt-6">
          <ul className="lg:flex lg:justify-between gap-4 overflow-x-auto scroll-smooth whitespace-nowrap relative inline-block">
            {categories().map((category: string) => (
              <li
                key={uuidv4()}
                onClick={() => setActiveTab(category)}
                className={`cursor-pointer font-bold dark:font-semibold text-lg lg:text-base 2xl:text-lg px-1 text-blue-950 dark:text-blue-600 py-2 lg:py-0 hover:scale-[105%] ${activeTab === category ? 'opacity-100' : 'opacity-50'}`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 h-full overflow-hidden border px-6 py-6 rounded">
          {categoryGigs.length > 0 ? (
            <>
              <a
                className="mt-10 w-[10%] rounded border border-slate-500/60 px-6 py-3 text-center text-sm font-bold text-blue-950 dark:text-blue-300 hover:bg-gray-300/80 dark:hover:bg-gray-700/80 focus:outline-none md:px-4 md:py-2 md:text-base"
                href={`/search/categories/${replaceSpacesWithDash(activeTab)}`}
              >
                Explore
              </a>
              <TopGigsView gigs={categoryGigs} width="w-72" type="index" />
            </>
          ) : (
            <div className="flex h-96 items-center justify-center text-lg text-gray-800 dark:text-gray-400">
              Information not available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigTabs;
