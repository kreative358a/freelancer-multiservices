// l. 472
import { ChangeEvent, FC, KeyboardEvent, ReactElement, useState } from 'react';
import { IPersonalInfoProps } from 'src/features/sellers/interfaces/seller.interface';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import TextInput from 'src/shared/inputs/TextInput';

const PersonalInfo: FC<IPersonalInfoProps> = ({ personalInfo, setPersonalInfo }): ReactElement => {
  const [allowedInfoLength, setAllowedInfoLength] = useState({
    description: '600/600',
    oneliner: '80/80'
  });
  const maxDescriptionCharacters = 600;
  const maxOneLinerCharacters = 80;

  return (
    <div className="border-b border-grey p-6">
      <div className="mb-4 grid md:grid-cols-5">
        <div className="pb-2 text-base xl:text-lg font-medium">
          Fullname<sup className="top-[-0.3em] text-base xl:text-lg text-red-500">*</sup>
        </div>
        <div className="col-span-4 w-full">
          <TextInput
            className="border-grey mb-1 w-full rounded border p-2 text-sm xl:text-base font-normal text-gray-800 focus:outline-none"
            type="text"
            name="fullname"
            value={personalInfo.fullName}
            onChange={(event: ChangeEvent) => {
              setPersonalInfo({ ...personalInfo, fullName: (event.target as HTMLInputElement).value });
            }}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-5 mb-6">
        <div className="text-base xl:text-lg font-medium pb-2 mt-6 md:mt-0">
          Oneliner<sup className="text-red-500 text-base xl:text-lg top-[-0.3em]">*</sup>
        </div>
        <div className="w-full col-span-4">
          <TextInput
            className="w-full rounded border border-grey p-2 mb-1 text-sm xl:text-base font-normal text-gray-800 focus:outline-none"
            type="text"
            name="oneliner"
            value={personalInfo.oneliner}
            placeholder="E.g. Expert Mobile and Web Developer"
            onChange={(event: ChangeEvent) => {
              const onelinerValue: string = (event.target as HTMLInputElement).value;
              setPersonalInfo({ ...personalInfo, oneliner: onelinerValue });
              const counter: number = maxOneLinerCharacters - onelinerValue.length;
              setAllowedInfoLength({ ...allowedInfoLength, oneliner: `${counter}/80` });
            }}
            onKeyDown={(event: KeyboardEvent) => {
              const currentTextLength = (event.target as HTMLInputElement).value.length;
              if (currentTextLength === maxOneLinerCharacters && event.key !== 'Backspace') {
                event.preventDefault();
              }
            }}
          />
          <span className="flex justify-end text-slate-700 dark:text-slate-300 text-xs">{allowedInfoLength.oneliner} Characters</span>
        </div>
      </div>
      <div className="grid md:grid-cols-5 mb-6">
        <div className="text-base xl:text-lg font-medium pb-2">
          Description<sup className="text-red-500 text-base xl:text-lg top-[-0.3em]">*</sup>
        </div>
        <div className="w-full col-span-4">
          <TextAreaInput
            className="w-full rounded border border-grey p-2 mb-1 text-sm xl:text-base font-normal text-gray-800 focus:outline-none"
            name="description"
            value={personalInfo.description}
            rows={5}
            onChange={(event: ChangeEvent) => {
              const descriptionValue: string = (event.target as HTMLInputElement).value;
              setPersonalInfo({ ...personalInfo, description: descriptionValue });
              const counter: number = maxDescriptionCharacters - descriptionValue.length;
              setAllowedInfoLength({ ...allowedInfoLength, description: `${counter}/600` });
            }}
            onKeyDown={(event: KeyboardEvent) => {
              const currentTextLength = (event.target as HTMLInputElement).value.length;
              if (currentTextLength === maxDescriptionCharacters && event.key !== 'Backspace') {
                event.preventDefault();
              }
            }}
          />
          <span className="flex justify-end text-slate-700 dark:text-slate-300 text-xs">{allowedInfoLength.description} Characters</span>
        </div>
      </div>
      <div className="grid md:grid-cols-5 mb-6">
        <div className="text-base xl:text-lg font-medium pb-2">
          Response Time<sup className="text-red-500 text-base xl:text-lg top-[-0.3em]">*</sup>
        </div>
        <div className="w-full col-span-4">
          <TextInput
            className="w-full rounded border border-grey p-2 mb-1 text-sm xl:text-base font-normal text-gray-800 focus:outline-none"
            type="number"
            name="responseTime"
            placeholder="E.g. 1"
            value={personalInfo.responseTime}
            onChange={(event: ChangeEvent) => {
              const value = (event.target as HTMLInputElement).value;
              setPersonalInfo({ ...personalInfo, responseTime: parseInt(value) > 0 ? value : '' });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
