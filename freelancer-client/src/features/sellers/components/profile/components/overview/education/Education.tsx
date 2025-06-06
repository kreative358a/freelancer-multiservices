import { FC, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { IEducation } from 'src/features/sellers/interfaces/seller.interface';
import { v4 as uuidv4 } from 'uuid';

import EducationFields from './EducationFields';

const Education: FC = (): ReactElement => {
  const [showEducationAddForm, setShowEducationAddForm] = useState<boolean>(false);
  const [showEducationEditForm, setShowEducationEditForm] = useState<boolean>(false);
  const [selectedEducation, setSelectedEducation] = useState<IEducation>();
  const { showEditIcons, sellerProfile } = useContext(SellerContext);

  return (
    <div className="border-grey mt-6 border bg-blue-600/10">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold  md:text-base">EDUCATION</h4>
        {showEditIcons && !showEducationAddForm && (
          <span
            className="flex cursor-pointer items-center pr-3.5 text-sm text-lime-800/90 dark:text-lime-500/90 hover:text-lime-800 dark:hover:text-lime-500 md:text-base"
            onClick={() => {
              setShowEducationAddForm(!showEducationAddForm);
              setShowEducationEditForm(false);
            }}
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none py-2 px-4">
        {showEducationAddForm && (
          <li className="flex justify-between">
            <EducationFields type="add" setShowEducationAddForm={setShowEducationAddForm} />
          </li>
        )}
        {!showEducationAddForm && (
          <>
            {sellerProfile?.education.map((education: IEducation) => (
              <li key={uuidv4()} className="mb-2 flex justify-between border-b">
                {!showEducationEditForm && (
                  <div className="col-span-3 ml-0 flex flex-col pb-2 text-sm md:text-base">
                    <div className="mr-3 pb-1 font-bold">
                      {education.major} {education.title}
                    </div>
                    <div className="mr-3 font-normal">
                      {education.university}, {education.country}, Graduated {education.year}
                    </div>
                  </div>
                )}
                {showEducationEditForm && selectedEducation?._id === education._id && (
                  <EducationFields type="edit" selectedEducation={selectedEducation} setShowEducationEditForm={setShowEducationEditForm} />
                )}
                {!showEducationEditForm && showEditIcons && (
                  <div className="mr-0">
                    <FaPencilAlt
                      size="12"
                      className="ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2"
                      onClick={() => {
                        setSelectedEducation(education);
                        setShowEducationEditForm(!showEducationEditForm);
                        setShowEducationAddForm(false);
                      }}
                    />
                  </div>
                )}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Education;
