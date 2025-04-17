// l. 502
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import Button from 'src/shared/button/Button';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';

const Description: FC = (): ReactElement => {
  const { sellerProfile, setSellerProfile, showEditIcons } = useContext(SellerContext);
  const [showDescriptionEditForm, setShowDescriptionEditForm] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(sellerProfile.description ? `${sellerProfile.description}` : '');

  return (
    <div className="border-grey border bg-blue-600/10">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold md:text-base">DESCRIPTION</h4>
        {showEditIcons && !showDescriptionEditForm && (
          <span
            onClick={() => {
              setShowDescriptionEditForm(!showDescriptionEditForm);
            }}
            className="flex cursor-pointer items-center pr-3.5 text-sm text-lime-800/90 dark:text-lime-500/90 hover:text-lime-800 dark:hover:text-lime-500 md:text-base"
          >
            Edit Description
          </span>
        )}
      </div>
      <div className="mb-1 py-2">
        {!showDescriptionEditForm && <div className="px-3.5 text-sm md:text-base">{sellerProfile.description}</div>}

        {showDescriptionEditForm && (
          <div className="flex w-full flex-col">
            <div className="mb-4 px-3">
              <TextAreaInput
                className="border-grey focus:border-grey block w-full rounded border p-2 text-sm xl:text-base  text-gray-900 focus:ring-blue-500"
                placeholder="Write description..."
                name="description"
                value={description}
                rows={5}
                maxLength={600}
                onChange={(event: ChangeEvent) => setDescription((event.target as HTMLInputElement).value)}
              />
            </div>
            <div className="mx-3 mb-2 flex cursor-pointer justify-start">
              <Button
                disabled={!description}
                className={`md:text-base rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2
                ${!description ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
                `}
                label="Update"
                onClick={() => {
                  if (setSellerProfile) {
                    setSellerProfile({ ...sellerProfile, description });
                    setShowDescriptionEditForm(false);
                  }
                }}
              />
              &nbsp;&nbsp;
              <Button
                className="text-sm xl:text-base rounded bg-rose-600/20 px-6 py-1 text-center font-bold hover:bg-rose-600/40 focus:outline-none md:py-2"
                label="Cancel"
                onClick={() => setShowDescriptionEditForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
