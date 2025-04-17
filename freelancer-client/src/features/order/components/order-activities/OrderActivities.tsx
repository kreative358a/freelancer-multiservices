// l. 598
import { forwardRef, ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import ChatBox from 'src/features/chat/components/chatbox/ChatBox';
import { IChatBuyerProps, IChatSellerProps } from 'src/features/chat/interfaces/chat.interface';
import { TimeAgo } from 'src/shared/utils/timeago.utils';

import { OrderContext } from '../../context/OrderContext';
import { DivElementRefType, IOrderActivitiesProps } from '../../interfaces/order.interface';
import OrderDelivered from './components/OrderDelivered';
import OrderExtension from './components/OrderExtension';
import OrderPlaced from './components/OrderPlaced';
import OrderReview from './components/OrderReview';

const OrderActivities: ForwardRefExoticComponent<Omit<IOrderActivitiesProps, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<
  DivElementRefType,
  IOrderActivitiesProps
>((props, ref) => {
  const { order, authUser, viewDeliveryBtnClicked } = props;
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const chatSeller: IChatSellerProps = {
    username: `${order.sellerUsername}`,
    _id: `${order.sellerId}`,
    // profilePicture: `${order.sellerImage !== null ? order.sellerImage : 'https://placehold.co/220x220?text=Seller+Image'}`,
    profilePicture: `${order.sellerImage}`,
    responseTime: 1
  };
  const chatBuyer: IChatBuyerProps = {
    username: `${order.buyerUsername}`,
    _id: `${order.buyerId}`,
    // profilePicture: `${order.buyerImage !== null ? order.buyerImage : 'https://placehold.co/220x220?text=Buyer+Image'}`
    profilePicture: `${order.buyerImage}`
  };

  console.log(order.dateOrdered);
  return (
    <div className="mb-3 mt-4 rounded-[4px] bg-blue-700/20 p-3 border border-blue-700/30">
      <div className="flex">
        <div className="my-5 rounded-full bg-blue-700/10 px-4 py-2 text-center text-sm font-bold">
          {TimeAgo.chatMessageTransform(`${order.dateOrdered}`)}
        </div>
      </div>
      <OrderContext.Provider value={{ order, authUser, viewDeliveryBtnClicked }}>
        <OrderPlaced />
        <OrderExtension />
        <OrderDelivered ref={ref} />
        <OrderReview />
      </OrderContext.Provider>
      <div className="px-3 pt-2 flex">
        If you need to contact the {order.buyerUsername === authUser.username ? 'seller' : 'buyer'},
        <div onClick={() => setShowChatBox((item: boolean) => !item)} className="px-2 text-blue-500 cursor-pointer hover:underline">
          Go to Inbox
        </div>
      </div>
      {showChatBox && <ChatBox seller={chatSeller} buyer={chatBuyer} gigId={order.gigId} onClose={() => setShowChatBox(false)} />}
    </div>
  );
});

export default OrderActivities;
