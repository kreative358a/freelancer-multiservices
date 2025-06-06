/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactElement } from 'react';
import { categories } from 'src/shared/utils/static-data';
import { v4 as uuidv4 } from 'uuid';

const Categories: FC = (): ReactElement => {
  return (
    <div className="px-6 md:px-10 lg:px-14 xl:px-12 2xl:px-20 border-t-[20px] border-gray-400 dark:border-gray-700 bg-slate-200 dark:bg-slate-800">
      <div className="mx-auto px-4 py-8 text-center lg:px-6 lg:py-10">
        <div className="mx-auto mb-2 lg:mb-16">
          <h2 className="mb-4 text-left sm:text-center text-xl lg:text-2xl font-normal tracking-tight text-sky-400">
            Explore <strong className="font-extrabold">Freelancer</strong> Categories
          </h2>
        </div>
        <div className="gap-8 hidden sm:grid sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category: any) => (
            <div key={uuidv4()} className="w-full py-5 cursor-pointer">
              <img className="mx-auto hidden mb-4 sm:w-8 sm:h-8 md:h-12 md:w-12 sm:flex" src={category.icon} alt={category.name} />
              <h3 className="mb-1 text-base hover:text-sky-400">
                <a className="w-full">{category.name}</a>
              </h3>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-4 py-1 sm:hidden mx-auto">
          {categories.map((category: any) => (
            <div
              key={uuidv4()}
              className="cursor-pointer text-blue-800 dark:blue-400 border-2 border-blue-800/40 dark:border-blue-400/40 rounded-3xl w-[200px] p-2 hover:border-blue-800/80 dark:hover:border-blue-400/80"
            >
              <h3 className="mb-1 text-sm font-bold ">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
