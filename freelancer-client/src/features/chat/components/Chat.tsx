// l. 559
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IMessageDocument } from '../interfaces/chat.interface';
import { useGetUserMessagesQuery } from '../services/chat.service';
import { chatMessageReceived } from '../services/chat.utils';
import ChatList from './chatlist/ChatList';
import ChatWindow from './chatwindow/ChatWindow';

const Chat: FC = (): ReactElement => {
  // l. 573
  const { conversationId } = useParams<string>();
  const chatMessages = useRef<IMessageDocument[]>([]);
  const [skip, setSkip] = useState<boolean>(false);
  const [chatMessagesData, setChatMessagesData] = useState<IMessageDocument[]>([]);
  const { data, isSuccess, isLoading, isError } = useGetUserMessagesQuery(`${conversationId}`, { skip });

  useEffect(() => {
    if (isSuccess) {
      setChatMessagesData(data?.messages as IMessageDocument[]);
    }
  }, [isSuccess, data?.messages]);

  useEffect(() => {
    chatMessageReceived(`${conversationId}`, chatMessagesData, chatMessages.current, setChatMessagesData);
  }, [chatMessagesData, conversationId]);

  return (
    <div
      className="rounded border-grey my-5 grid grid-cols-1 sm:flex-row max-h-[90%] sm:flex sm:flex-wrap border w-full"
      // className="w-full border-grey mx-2 my-5 flex max-h-[90%] flex-wrap border lg:container lg:mx-auto"
    >
      <div
        className="border-grey relative w-full overflow-hidden sm:w-1/3 sm:border-r"
        // className="lg:border-grey relative w-full overflow-hidden lg:w-1/3 lg:border-r"
      >
        <ChatList />
      </div>

      <div
        className="relative w-full overflow-hidden sm:w-2/3 lg:flex"
        // className="relative hidden w-full overflow-hidden md:w-2/3 lg:flex"
      >
        {conversationId && chatMessagesData.length > 0 ? (
          <ChatWindow setSkip={setSkip} chatMessages={chatMessagesData} isLoading={isLoading} isError={isError} />
        ) : (
          <div className="flex w-full items-center justify-center">Select a user to chat with.</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
