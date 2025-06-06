// l. 596
import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import { FaCircleNotch, FaPaperclip, FaRegFile, FaTimes } from 'react-icons/fa';
import { IDeliveredWork } from 'src/features/order/interfaces/order.interface';
import { useDeliverOrderMutation } from 'src/features/order/services/order.service';

import Button from '../button/Button';
import TextAreaInput from '../inputs/TextAreaInput';
import TextInput from '../inputs/TextInput';
import { checkFile, fileType, readAsBase64 } from '../utils/image-utils.service';
import { bytesToSize, showErrorToast, showSuccessToast } from '../utils/utils.service';
import { IModalProps } from './interfaces/modal.interface';
import ModalBg from './ModalBg';

const DeliverWorkModal: FC<IModalProps> = ({ order, onClose }): ReactElement => {
  const [description, setDescription] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showImagePreview, setShowImagePreview] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [deliverOrder, { isLoading }] = useDeliverOrderMutation();

  const handleFileChange = (event: ChangeEvent): void => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      const file: File = target.files[0];
      if (!checkFile(file)) {
        setSelectedFile(file);
        setShowImagePreview(true);
      }
    }
  };

  const deliverWork = async (): Promise<void> => {
    try {
      const selectedWorkFile = selectedFile as File;
      const dataImage: string | ArrayBuffer | null = await readAsBase64(selectedWorkFile);
      const completedWork: IDeliveredWork = {
        message: description,
        file: dataImage as string,
        fileType: fileType(selectedWorkFile as File),
        fileSize: selectedWorkFile.size,
        fileName: selectedWorkFile.name
      };
      await deliverOrder({ orderId: `${order?.orderId}`, body: completedWork });
      showSuccessToast('Order delivered successfully.');
      if (onClose) {
        onClose();
      }
    } catch (error) {
      showErrorToast('Error delivering order.');
    }
  };

  return (
    <ModalBg>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[30] flex w-full items-center justify-center">
        {isLoading && (
          <div className="fixed bottom-0 left-0 right-0 top-0 z-[50] flex w-full items-center justify-center opacity-80">
            <div className="rounded absolute bottom-auto left-auto right-auto top-auto flex min-h-[280px] min-w-[500px] flex-col items-center justify-center bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur p-4 border-2 border-slate-500/60">
              <FaCircleNotch className="animate-spin" size={40} color="#50b5ff" />
              <span>Uploading...</span>
            </div>
          </div>
        )}
        <div className="">
          <div className="rounded relative bottom-auto left-auto right-auto top-auto max-h-[90vh] min-w-[500px] bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur border-2 border-slate-500/60 p-4">
            <div className="mb-5 w-full text-left">
              <h4 className="text-base font-bold">Deliver your work</h4>
              <p>Images, Pdfs: Max. 10mb</p>
              <p>Videos or Zip: Max. 100mb</p>
            </div>
            <div>
              <TextAreaInput
                className="w-full rounded-t border border-slate-500/60 p-2 text-sm xl:text-base  font-normal text-gray-800 focus:outline-none"
                name="description"
                placeholder="Add a response to buyer..."
                value={description}
                rows={4}
                onChange={(event: ChangeEvent) => setDescription((event.target as HTMLTextAreaElement).value)}
              />
              {showImagePreview ? (
                <div className="mb-5">
                  <div className="flex rounded pb-2">
                    <div className="flex h-[80px] w-[100px] flex-col items-center justify-center rounded border border-slate-500/60 p-3">
                      <FaRegFile className="text-gray-800 dark:text-gray-200 " size={25} />
                      <span className="w-[100px] truncate px-3 py-1 text-xs font-bold ">{selectedFile?.name}</span>
                      <p className="mb-0 text-xs">{bytesToSize(parseInt(`${selectedFile?.size}`))}</p>
                    </div>
                    <FaTimes
                      onClick={() => {
                        setSelectedFile(null);
                        setShowImagePreview(false);
                      }}
                      className="absolute right-[18px] mt-[5px] cursor-pointer text-gray-800 dark:text-gray-200"
                    />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileRef?.current?.click()}
                  className="mt-2 flex w-[30%] cursor-pointer gap-2 rounded bg-blue-300/40 px-[0.75rem] py-[0.3rem]"
                >
                  <FaPaperclip className="flex self-center" />
                  <span className="bg-transparent text-sm">Upload work</span>
                  <TextInput
                    name="chatFile"
                    ref={fileRef}
                    type="file"
                    style={{ display: 'none' }}
                    onClick={() => {
                      if (fileRef?.current) {
                        fileRef.current.value = '';
                      }
                    }}
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                className="rounded bg-gray-200/80 hover:bg-gray-200/90 px-6 py-3 text-center text-sm font-bold text-black focus:outline-none md:px-4 md:py-2 md:text-base"
                label="Cancel"
                onClick={onClose}
              />
              <Button
                disabled={!description || !selectedFile}
                className={`cursor-not-allowed rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${
                  !description || !selectedFile ? ' bg-sky-200' : 'bg-sky-500/90 hover:bg-sky-500 cursor-pointer'
                }`}
                label="Deliver"
                onClick={deliverWork}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalBg>
  );
};

export default DeliverWorkModal;
