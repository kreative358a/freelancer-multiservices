// l. 498
import { FC, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { v4 as uuidv4 } from 'uuid';

import SocialLinksEditField from './SocialLinksEditField';

const SocialLinks: FC = (): ReactElement => {
  const [showSocialLinkAddForm, setShowSocialLinkAddForm] = useState<boolean>(false);
  const [showSocialLinkEditForm, setShowSocialLinkEditForm] = useState<boolean>(false);
  const [selectedSocialLink, setSelectedSocialLink] = useState<string>();
  const { sellerProfile, showEditIcons } = useContext(SellerContext);

  return (
    <div className="border-grey border bg-blue-600/10 mt-6">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold  md:text-base">SOCIAL LINKS</h4>
        {showEditIcons && (
          <span
            onClick={() => {
              setShowSocialLinkAddForm(!showSocialLinkAddForm);
              setShowSocialLinkEditForm(false);
            }}
            className="flex cursor-pointer items-center pr-3.5 text-lime-800/90 dark:text-lime-500/90 hover:text-lime-800 dark:hover:text-lime-500 text-sm md:text-base"
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none py-2 px-4">
        {showSocialLinkAddForm && (
          <li className="flex justify-between">
            <SocialLinksEditField type="add" setShowSocialLinksAddForm={setShowSocialLinkAddForm} />
          </li>
        )}
        {!showSocialLinkAddForm && (
          <>
            {sellerProfile.socialLinks.map((link: string) => (
              <li key={uuidv4()} className="mb-2 flex justify-between border-b">
                {!showSocialLinkEditForm && (
                  <div className="col-span-3 ml-0 flex pb-1 text-sm md:text-base">
                    <a href={link} target="_blank" className="mr-3 text-sky-500 no-underline hover:underline">
                      {link}
                    </a>
                  </div>
                )}
                {showSocialLinkEditForm && selectedSocialLink === link && (
                  <SocialLinksEditField
                    type="edit"
                    selectedLink={selectedSocialLink}
                    setShowSocialLinksEditForm={setShowSocialLinkEditForm}
                  />
                )}
                {!showSocialLinkEditForm && showEditIcons && (
                  <div className="mr-0">
                    <FaPencilAlt
                      onClick={() => {
                        setSelectedSocialLink(link);
                        setShowSocialLinkAddForm(false);
                        setShowSocialLinkEditForm(!showSocialLinkEditForm);
                      }}
                      size="12"
                      className="ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2"
                    />
                  </div>
                )}
              </li>
            ))}
          </>
        )}

        {!sellerProfile?.socialLinks.length && <li className="flex justify-between mb-2 ml-4">No information</li>}
      </ul>
    </div>
  );
};

export default SocialLinks;
