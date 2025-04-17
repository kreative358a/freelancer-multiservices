// l. 471
import { filter } from 'lodash';
import { FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IBuyerDocument } from 'src/features/buyer/interfaces/buyer.interface';
import { addBuyer } from 'src/features/buyer/reducers/buyer.reducer';
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb';
import Button from 'src/shared/button/Button';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { IResponse } from 'src/shared/shared.interface';
import { deleteFromLocalStorage, lowerCase, showErrorToast } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { useSellerSchema } from '../../hooks/useSellerSchema';
import { ICertificate, IEducation, IExperience, ILanguage, IPersonalInfoData, ISellerDocument } from '../../interfaces/seller.interface';
import { addSeller } from '../../reducers/seller.reducer';
import { useCreateSellerMutation } from '../../services/seller.service';
import PersonalInfo from './components/PersonalInfo';
import SellerCertificateFields from './components/SellerCertificateFields';
import SellerEducationFields from './components/SellerEducationFields';
import SellerExperienceFields from './components/SellerExperienceFields';
import SellerLanguageFields from './components/SellerLanguagesFields';
import SellerSkillField from './components/SellerSkillField';
import SellerSocialLinksFields from './components/SellerSocialLinksFields';
// import avatar from 'src/assets/avatar-small.png';

const AddSeller: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const buyer = useAppSelector((state: IReduxState) => state.buyer);
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfoData>({
    fullName: '',
    profilePicture: `${authUser.profilePicture}`,
    description: '',
    responseTime: '',
    oneliner: ''
  });
  const [experienceFields, setExperienceFields] = useState<IExperience[]>([
    {
      title: '',
      company: '',
      startDate: 'Start Year',
      endDate: 'End Year',
      currentlyWorkingHere: false,
      description: ''
    }
  ]);
  const [educationFields, setEducationFields] = useState<IEducation[]>([
    {
      country: 'Country',
      university: '',
      title: 'Title',
      major: '',
      year: 'Year'
    }
  ]);
  const [skillsFields, setSkillsFields] = useState<string[]>(['']);
  const [languageFields, setLanguageFields] = useState<ILanguage[]>([
    {
      language: '',
      level: 'Level'
    }
  ]);
  const [certificateFields, setCertificateFields] = useState<ICertificate[]>([
    {
      name: '',
      from: '',
      year: 'Year'
    }
  ]);
  const [socialFields, setSocialFields] = useState<string[]>(['']);

  // l, 481
  const [schemaValidation, personalInfoErrors, experienceErrors, educationErrors, skillsErrors, languagesErrors] = useSellerSchema({
    personalInfo,
    experienceFields,
    educationFields,
    skillsFields,
    languageFields
  });
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [createSeller, { isLoading }] = useCreateSellerMutation();

  const errors = [...personalInfoErrors, ...experienceErrors, ...educationErrors, ...skillsErrors, ...languagesErrors];
  // console.log("AddSeller errors: ", errors)

  // l. 482
  const onCreateSeller = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const isValid: boolean = await schemaValidation();
      if (isValid) {
        const skills: string[] = filter(skillsFields, (skill: string) => skill !== '') as string[];
        const socialLinks: string[] = filter(socialFields, (item: string) => item !== '') as string[];
        const certificates: ICertificate[] = filter(
          certificateFields,
          (item: ICertificate) => item.name !== '' && item.from !== '' && item.year !== ''
        ) as ICertificate[];
        const sellerData: ISellerDocument = {
          email: `${authUser.email}`,
          profilePublicId: `${authUser.profilePublicId}`,
          // profilePicture: `${authUser.profilePicture !== null ? authUser.profilePicture : 'https://placehold.co/330x220?text=Profile+Image'}`,
          profilePicture: `${authUser.profilePicture}`,
          fullName: personalInfo.fullName,
          description: personalInfo.description,
          country: `${authUser.country}`,
          skills,
          oneliner: personalInfo.oneliner,
          languages: languageFields,
          responseTime: parseInt(personalInfo.responseTime, 10),
          experience: experienceFields,
          education: educationFields,
          socialLinks,
          certificates
        };
        const updateBuyer: IBuyerDocument = { ...buyer, isSeller: true };
        const response: IResponse = await createSeller(sellerData).unwrap();
        dispatch(addSeller(response.seller));
        dispatch(addBuyer(updateBuyer));
        navigate(`/seller_profile/${lowerCase(`${authUser.username}`)}/${response.seller?._id}/edit`);
      }
    } catch (error) {
      showErrorToast('Error creating seller profile.');
    }
  };

  // l. 519
  useEffect(() => {
    return () => {
      // delete becomeASeller from localStorage when user leaves this page
      deleteFromLocalStorage('becomeASeller');
    };
  }, []);

  return (
    <div className="relative w-full">
      <Breadcrumb breadCrumbItems={['Seller', 'Create Profile']} />
      <div className="container mx-auto my-5 overflow-hidden px-2 pb-12 md:px-0">
        {isLoading && <CircularPageLoader />}
        {/* comment if no resend email */}
        {/* l. 483 12m */}
        {authUser && !authUser.emailVerified && (
          <div className="absolute left-0 top-0 z-50 flex h-full w-full justify-center bg-gray-400/[0.6] text-sm xl:text-base font-bold md:text-base lg:text-xl">
            <span className="mt-20 text-red-900/80 dark:text-red-600/80">Please verify your email.</span>
          </div>
        )}
        {/* comment if no resend email */}
        <div className="left-0 top-0 z-10 mt-4 block h-full bg-gray-100 dark:bg-gray-900 text-slate-900 dark:text-gray-100">
          {errors.length > 0 ? (
            <div className="text-red-400">{`You have ${errors.length} error${errors.length > 1 ? 's' : ''}`}</div>
          ) : (
            <></>
          )}
          <PersonalInfo personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} personalInfoErrors={personalInfoErrors} />
          <SellerExperienceFields
            experienceFields={experienceFields}
            setExperienceFields={setExperienceFields}
            experienceErrors={experienceErrors}
          />
          <SellerEducationFields
            educationFields={educationFields}
            setEducationFields={setEducationFields}
            educationErrors={educationErrors}
          />
          <SellerSkillField skillsFields={skillsFields} setSkillsFields={setSkillsFields} skillsErrors={skillsErrors} />
          <SellerLanguageFields languageFields={languageFields} setLanguageFields={setLanguageFields} languagesErrors={languagesErrors} />
          <SellerCertificateFields certificatesFields={certificateFields} setCertificatesFields={setCertificateFields} />
          <SellerSocialLinksFields socialFields={socialFields} setSocialFields={setSocialFields} />
          <div className="flex justify-end p-6">
            <Button
              onClick={onCreateSeller}
              className="rounded h-8 xl:h-10 bg-sky-500 px-8 text-center text-base xl:text-lg font-bold text-white hover:bg-sky-400 focus:outline-none"
              label="Create Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSeller;
