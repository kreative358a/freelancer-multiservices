// l. 480
import { ChangeEvent, FC, ReactElement } from 'react';
import { ICertificate, ICertificateProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/utils.service';

import Dropdown from '../../../../../shared/dropdown/Dropdown';

const SellerCertificateFields: FC<ICertificateProps> = ({ certificatesFields, setCertificatesFields }): ReactElement => {
  const adCertificateFields = (): void => {
    const newfield: ICertificate = {
      name: '',
      from: '',
      year: 'Year'
    };
    if (certificatesFields && setCertificatesFields) {
      setCertificatesFields([...certificatesFields, newfield]);
    }
  };

  const removeCertificateFields = (index: number): void => {
    if (certificatesFields && setCertificatesFields && certificatesFields.length > 1) {
      const data: ICertificate[] = [...certificatesFields];
      data.splice(index, 1);
      setCertificatesFields([...data]);
    }
  };

  const handleCertificateFieldsChange = (event: ChangeEvent, index: number): void => {
    if (certificatesFields && setCertificatesFields) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const data: ICertificate[] = [...certificatesFields];
      data[index][target.name] = target.value;
      setCertificatesFields([...data]);
    }
  };

  return (
    <>
      <div className="border-grey flex min-h-[250px] w-full flex-col border-b px-6 pb-3 pt-4">
        <div className="flex justify-between">
          <h2 className="pb-3 text-xl font-bold">Awards/Certificates</h2>
          <Button
            className="h-6 xl:h-8 rounded bg-sky-500 px-6 text-center text-sm xl:text-base font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
            onClick={adCertificateFields}
            label="Add More"
          />
        </div>
        {certificatesFields?.map((input: ICertificate, index: number) => (
          <div key={index}>
            <div className="flex flex-col">
              <TextInput
                className="border-grey mb-4 w-full rounded border p-2 text-sm xl:text-base font-normal text-gray-800 focus:outline-none"
                placeholder="Certificate or Award"
                type="text"
                name="name"
                value={input.name}
                onChange={(event: ChangeEvent) => handleCertificateFieldsChange(event, index)}
              />
              <TextInput
                className="border-grey mb-4 w-full rounded border p-2 text-sm xl:text-base font-normal text-gray-800 focus:outline-none"
                placeholder="Certificate From (e.g: Google)"
                type="text"
                name="from"
                value={input.from}
                onChange={(event: ChangeEvent) => handleCertificateFieldsChange(event, index)}
              />
            </div>
            <div className="relative flex flex-col">
              <Dropdown
                text={`${input.year}`}
                maxHeight="300"
                showSearchInput={true}
                mainClassNames="absolute bg-white text-sm xl:text-base z-10"
                values={yearsList(100)}
                onClick={(item: string) => {
                  const data: ICertificate[] = [...certificatesFields];
                  data[index]['year'] = `${item}`;
                  if (setCertificatesFields) {
                    setCertificatesFields([...data]);
                  }
                }}
              />
              {certificatesFields.length > 1 && index > 0 && (
                <div className="mb-4 mt-16">
                  <Button
                    className="h-6 xl:h-8 rounded bg-red-500 px-6 text-center text-sm xl:text-base font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                    onClick={() => removeCertificateFields(index)}
                    label="Delete"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SellerCertificateFields;
