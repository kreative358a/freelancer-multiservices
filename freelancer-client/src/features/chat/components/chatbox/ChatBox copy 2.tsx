// l. 559
import { ChangeEvent, FC, FormEvent, ReactElement, RefObject, useRef, useState } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { IResponse } from 'src/shared/shared.interface';
import { generateRandomNumber, showErrorToast } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

import useChatScrollToBottom from '../../hooks/useChatScrollToBottom';
import { IChatBoxProps, IConversationDocument, IMessageDocument } from '../../interfaces/chat.interface';
import { useGetConversationQuery, useGetMessagesQuery, useSaveChatMessageMutation } from '../../services/chat.service';
import ChatBoxSkeleton from './ChatBoxSkeleton';

const ChatBox: FC<IChatBoxProps> = ({ seller, buyer, gigId, onClose }): ReactElement => {
  // l. 561
  const authUser = useAppSelector((state: IReduxState) => state.authUser);

  const [message, setMessage] = useState<string>('');

  const conversationIdRef = useRef<string>(`${generateRandomNumber(15)}`);

  const { data: conversationData, isSuccess: isConversationSuccess } = useGetConversationQuery({
    senderUsername: `${seller.username}`,
    receiverUsername: `${buyer.username}`
  });

  const {
    data: messageData,
    isLoading: isMessageLoading,
    isSuccess: isMessageSuccess
  } = useGetMessagesQuery(
    { senderUsername: `${seller.username}`, receiverUsername: `${buyer.username}` },
    { refetchOnMountOrArgChange: true }
  );

  let chatMessages: IMessageDocument[] = [];

  if (isConversationSuccess && conversationData.conversations && conversationData.conversations.length) {
    conversationIdRef.current = (conversationData.conversations[0] as IConversationDocument).conversationId;
  }
  if (isMessageSuccess) {
    chatMessages = messageData.messages as IMessageDocument[];
  }

  const scrollRef: RefObject<HTMLDivElement> = useChatScrollToBottom(chatMessages);
  const [saveChatMessage] = useSaveChatMessageMutation();

  // l. 562
  const sendMessage = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!message) {
      return;
    }
    try {
      const messageBody: IMessageDocument = {
        conversationId: conversationIdRef.current,
        hasConversationId: conversationData && conversationData.conversations && conversationData.conversations.length > 0,
        body: message,
        gigId,
        sellerId: seller._id,
        buyerId: buyer._id,
        //
        senderUsername: authUser.username === seller.username ? seller.username : buyer.username,
        senderPicture: authUser.username === seller.username ? seller.profilePicture : buyer.profilePicture,
        receiverUsername: authUser.username !== seller.username ? seller.username : buyer.username,
        receiverPicture: authUser.username !== seller.username ? seller.profilePicture : buyer.profilePicture,
        //
        // senderUsername: authUser.username === seller.username ? seller.username : buyer.username,
        // senderPicture:
        //   authUser.username === seller.username
        //     ? seller.profilePicture !== null
        //       ? seller.profilePicture
        //       : 'https://placehold.co/330x220?text=Profile+Image'
        //     : buyer.profilePicture !== null
        //       ? buyer.profilePicture
        //       : 'https://placehold.co/330x220?text=Profile+Image',
        // receiverUsername: authUser.username !== seller.username ? seller.username : buyer.username,
        // receiverPicture:
        //   authUser.username !== seller.username
        //     ? seller.profilePicture !== null
        //       ? seller.profilePicture
        //       : 'https://placehold.co/330x220?text=Profile+Image'
        //     : buyer.profilePicture !== null
        //       ? buyer.profilePicture
        //       : 'https://placehold.co/330x220?text=Profile+Image',
        //
        isRead: false,
        hasOffer: false
      };
      const response: IResponse = await saveChatMessage(messageBody).unwrap();
      setMessage('');
      conversationIdRef.current = `${response.conversationId}`;
    } catch (error) {
      showErrorToast('Error sending message.');
    }
  };

  return (
    <>
      {isMessageLoading && !chatMessages ? (
        <ChatBoxSkeleton />
      ) : (
        <div className=" mb-[4px] border-grey fixed bottom-0 left-1 right-4 w-[400px] h-[400px] max-h-[500px] border md:left-2 sm:h-[500px] sm:max-h-[500px] md:w-[400px] md:max-w-[400px] rounded bg-slate-300 dark:bg-slate-700">
          <div className="border-grey flex items-center space-x-4 border-b px-5 py-2">
            {/* <img
              src={
                authUser.username !== seller.username
                  ? seller.profilePicture || 'https://placehold.co/330x220?text=Profile+Image'
                  : buyer.profilePicture || 'https://placehold.co/330x220?text=Profile+Image'
              }
              className="h-10 w-10 rounded-full"
              alt="profile image"
            /> */}
            <img
              src={authUser.username !== seller.username ? seller.profilePicture : buyer.profilePicture}
              className="h-10 w-10 rounded-full"
              alt="profile image"
            />
            <div className="w-full font-medium">
              <div className="flex w-full cursor-pointer justify-between text-sm font-bold md:text-base">
                <span>{authUser.username !== seller.username ? seller.username : buyer.username}</span>
                <FaTimes className="flex self-center" onClick={onClose} />
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Avg. response time: {seller.responseTime} hour{seller.responseTime === 1 ? '' : 's'}
              </div>
            </div>
          </div>

          <div className="h-[500px] overflow-y-scroll md:h-full">
            <div className="my-2 flex h-[280px] flex-col overflow-y-scroll px-4 md:h-[72%]" ref={scrollRef}>
              {chatMessages.map((msg: IMessageDocument) => (
                <div
                  key={uuidv4()}
                  className={`my-2 flex max-w-[300px] gap-y-6 text-sm ${
                    msg.senderUsername !== buyer.username ? 'flex-row-reverse self-end' : ''
                  }`}
                >
                  <img
                    src={msg.senderUsername === seller.username ? seller.profilePicture : buyer.profilePicture}
                    className={`h-8 w-8 rounded-full ${msg.senderUsername !== buyer.username ? 'ml-2' : ''}`}
                    alt="profile image"
                  />
                  {/* <img
                    src={buyer.profilePicture}
                    className={`h-8 w-8 rounded-full ${msg.senderUsername !== buyer.username ? 'hidden' : ''}`}
                    alt="profile image"
                  /> */}
                  <p
                    className={`ml-2 max-w-[200px] rounded-[10px] px-4 py-2 text-start text-sm font-normal md:max-w-[220px] dark:bg-slate-800/60 bg-slate-200/60 ${
                      msg.senderUsername !== buyer.username ? 'max-w-[200px] rounded-[10px] bg-sky-500 text-white' : ''
                    }`}
                  >
                    {msg.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={sendMessage} className="absolute bottom-0 left-0 right-0 mb-1 flex px-2 ">
            <TextInput
              type="text"
              name="message"
              value={message}
              placeholder="Enter your message..."
              className="border-grey mb-0 w-full min-w-[320px] rounded-l-lg border p-2 text-sm font-normal text-gray-800 focus:outline-none"
              onChange={(event: ChangeEvent) => setMessage((event.target as HTMLInputElement).value)}
            />
            <Button
              className="rounded-r-lg bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-3 md:text-base"
              label={<FaPaperPlane className="self-center" />}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBox;
