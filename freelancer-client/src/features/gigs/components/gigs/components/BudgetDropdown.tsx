// l. 543
import { ChangeEvent, FC, KeyboardEvent, ReactElement, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { ISelectedBudget } from 'src/features/gigs/interfaces/gig.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { saveToLocalStorage } from 'src/shared/utils/utils.service';

const BudgetDropdown: FC = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [selectedBudget, setSelectedBudget] = useState<ISelectedBudget>({ minPrice: '', maxPrice: '' });

  return (
    <div className="flex flex-col">
      <div className="relative">
        <Button
          className="flex justify-between gap-5 rounded-lg border border-gray-400 px-4 py-3 font-medium hover:bg-blue-600/40"
          label={
            <>
              <span>Budget range</span>
              {!toggleDropdown ? (
                <FaChevronDown className="float-right h-4 fill-current mt-1" />
              ) : (
                <FaChevronUp className="float-right mt-§ h-4 fill-current mt-1" />
              )}
            </>
          }
          onClick={() => setToggleDropdown((item: boolean) => !item)}
        />
        {toggleDropdown && (
          <div className="absolute mt-2 w-96 divide-y divide-gray-100 rounded-lg border border-slate-100 dark:bg-gray-700 bg-gray-200 drop-shadow-md sm:w-72">
            <ul className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="min" className="mb-2 block text-sm font-normal text-slate-900 dark:text-slate-100">
                      MIN.
                    </label>
                    <TextInput
                      type="number"
                      id="min"
                      min="0"
                      name="minPrice"
                      value={selectedBudget.minPrice ?? ''}
                      className="rounded-sm block w-full border border-gray-300 px-2 py-1 text-sm xl:text-base  text-gray-900 dark:placeholder-gray-400 focus:outline focus:outline-blue-600/40"
                      placeholder="Any"
                      onChange={(event: ChangeEvent) => {
                        setSelectedBudget({ ...selectedBudget, minPrice: `${(event.target as HTMLInputElement).value}` });
                      }}
                      onKeyDown={(event: KeyboardEvent) => {
                        if (event.key !== 'Backspace' && isNaN(parseInt(event.key))) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="max" className="mb-2 block text-sm font-normal text-slate-900 dark:text-slate-100">
                      MAX.
                    </label>
                    <TextInput
                      type="number"
                      id="max"
                      name="maxPrice"
                      value={selectedBudget.maxPrice ?? ''}
                      className="rounded-sm block w-full border border-gray-300 px-2 py-1 text-sm xl:text-base  text-gray-900 dark:placeholder-gray-400 focus:outline focus:outline-blue-600/40"
                      placeholder="Any"
                      onChange={(event: ChangeEvent) => {
                        setSelectedBudget({ ...selectedBudget, maxPrice: `${(event.target as HTMLInputElement).value}` });
                      }}
                      onKeyDown={(event: KeyboardEvent) => {
                        if (event.key !== 'Backspace' && isNaN(parseInt(event.key))) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </div>
                </div>
              </li>
            </ul>
            <div className="my-4 flex cursor-pointer justify-evenly pt-3">
              <div
                className="rounded-sm bg-teal-500 font-bold px-4 py-2 text-sm text-slate-100 hover:bg-teal-600"
                onClick={() => {
                  setSelectedBudget({ minPrice: '', maxPrice: '' });
                  setToggleDropdown(false);
                }}
              >
                Clear All
              </div>
              <div
                className="rounded-sm bg-sky-500 px-4 py-2 text-sm font-bold text-slate-100 hover:bg-sky-600"
                onClick={() => {
                  const updatedSearchParams: URLSearchParams = new URLSearchParams(searchParams.toString());
                  updatedSearchParams.set('minPrice', selectedBudget.minPrice);
                  updatedSearchParams.set('maxPrice', selectedBudget.maxPrice);
                  setSearchParams(updatedSearchParams);
                  setToggleDropdown(false);
                  saveToLocalStorage('filterApplied', JSON.stringify(true));
                }}
              >
                Apply
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 flex h-10 gap-4 text-xs md:text-sm xl:text-base text-slate-800 dark:text-slate-200">
        {selectedBudget?.minPrice && selectedBudget?.maxPrice && (
          <Button
            className="flex gap-4 self-center rounded-xl bg-gray-300/80 dark:bg-gray-700/80 px-4 py-2 font-bold hover:bg-gray-300/90 dark:hover:bg-gray-700/90 mx-auto"
            label={
              <>
                ${selectedBudget.minPrice} - ${selectedBudget.maxPrice}
                <FaTimes className="self-center font-normal" />
              </>
            }
            onClick={() => {
              const updatedSearchParams: URLSearchParams = new URLSearchParams(searchParams.toString());
              updatedSearchParams.delete('minPrice');
              updatedSearchParams.delete('maxPrice');
              setSearchParams(updatedSearchParams);
              setToggleDropdown(false);
              setSelectedBudget({ minPrice: '', maxPrice: '' });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BudgetDropdown;
