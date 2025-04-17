// l. 480
import { ChangeEvent, FC, ReactElement } from 'react';
import { ISkillProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';

const SellerSkillField: FC<ISkillProps> = ({ skillsFields, setSkillsFields }): ReactElement => {
  const addSkillFields = (): void => {
    if (setSkillsFields && skillsFields) {
      setSkillsFields([...skillsFields, '']);
    }
  };

  const removeSkillFields = (index: number): void => {
    if (setSkillsFields && skillsFields && skillsFields.length > 1) {
      const data: string[] = [...skillsFields];
      data.splice(index, 1);
      setSkillsFields([...data]);
    }
  };

  const handleSkillsFieldsChange = (event: ChangeEvent, index: number): void => {
    if (setSkillsFields && skillsFields) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const data: string[] = [...skillsFields];
      data[index] = target.value;
      setSkillsFields([...data]);
    }
  };

  return (
    <>
      <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-4">
        <div className="flex justify-between">
          <h2 className="pb-3 text-xl font-bold">Skills</h2>
          <Button
            onClick={addSkillFields}
            className="h-6 xl:h-8 rounded bg-sky-500 px-6 text-center text-sm xl:text-base font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
            label="Add More"
          />
        </div>
        {skillsFields?.map((input: string, index: number) => (
          <div key={index}>
            <TextInput
              className="border-grey w-full rounded border p-2 text-sm xl:text-base  font-normal text-gray-800 focus:outline-none"
              placeholder="Skill E.g: Front End Developer"
              type="text"
              name="skill"
              value={input}
              onChange={(event: ChangeEvent) => handleSkillsFieldsChange(event, index)}
            />
            <div className="my-3">
              {skillsFields.length > 1 && index > 0 && (
                <Button
                  className="h-6 xl:h-8 rounded bg-red-500 px-6 text-center text-sm xl:text-base font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                  onClick={() => removeSkillFields(index)}
                  label="Delete"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SellerSkillField;
