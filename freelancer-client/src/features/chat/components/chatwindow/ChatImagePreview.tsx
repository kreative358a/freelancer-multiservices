// l. 575
import { ChangeEvent, FC, ReactElement } from 'react';
import { FaCircleNotch, FaRegFileArchive, FaTimes } from 'react-icons/fa';
import TextInput from 'src/shared/inputs/TextInput';
import { validateImage } from 'src/shared/utils/image-utils.service';
import { bytesToSize } from 'src/shared/utils/utils.service';

import { IFilePreviewProps } from '../../interfaces/chat.interface';

const ChatImagePreview: FC<IFilePreviewProps> = ({
  image,
  file,
  isLoading,
  message,
  handleChange,
  onSubmit,
  onRemoveImage
}): ReactElement => {
  return (
    <div className="border-grey left-0 top-0 z-50 h-[190px] w-full border-t">
      <>
        {!isLoading ? (
          <>
            <div className="mb-1 w-full p-2">
              <form onSubmit={onSubmit}>
                <TextInput
                  name="message"
                  type="text"
                  value={message}
                  className="border-grey mb-1 w-full rounded border p-3 text-sm font-normal text-gray-800 focus:outline-none"
                  placeholder="Enter your message..."
                  onChange={(event: ChangeEvent) => handleChange(event)}
                />
              </form>
            </div>
            <div className="border-grey absolute flex w-[320px] cursor-pointer justify-between border-t p-2">
              {validateImage(file, 'image') ? (
                <img className="h-24 w-40 rounded object-cover" src={image} alt="" />
              ) : (
                <div className="border-grey flex h-24 w-40 flex-col items-center justify-center truncate rounded border p-2">
                  <FaRegFileArchive className="text-xs md:text-sm" size={25} />
                  <span className="max-w-[100%] overflow-hidden truncate py-1 text-xs font-bold">{file.name}</span>
                  <p className="text-xs">{bytesToSize(file.size)}</p>
                </div>
              )}

              <FaTimes className="text-[#bdbdbd]" onClick={onRemoveImage} />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-red-50">
            <FaCircleNotch
              className="animate-spin h-12 w-12 lg:h-24 lg:w-20 2xl:h-48 xl:w-48 mr-3"
              size={40}
              color="dark:#50b5ff #2c51a0"
            />
            <span>Uploading...</span>
          </div>
        )}
      </>
    </div>
  );
};

export default ChatImagePreview;
