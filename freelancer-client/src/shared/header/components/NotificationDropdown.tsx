// l. 609
import { orderBy } from 'lodash';
import { FC, ReactElement, useEffect, useState } from 'react';
import { FaRegEnvelope, FaRegEnvelopeOpen } from 'react-icons/fa';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IOrderNotification } from 'src/features/order/interfaces/order.interface';
import { useGetNotificationsByIdQuery, useMarkUnreadNotificationMutation } from 'src/features/order/services/notification.service';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { showErrorToast } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

import { IHomeHeaderProps } from '../interfaces/header.interface';

const NotificationDropdown: FC<IHomeHeaderProps> = ({ setIsNotificationDropdownOpen }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [notifications, setNotifications] = useState<IOrderNotification[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const { data, isSuccess } = useGetNotificationsByIdQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true });
  const [markUnReadNotification] = useMarkUnreadNotificationMutation();

  const markNotificationAsRead = async (notificationId: string): Promise<void> => {
    try {
      await markUnReadNotification(notificationId).unwrap();
    } catch (error) {
      console.log('markNotificationAsRead error:', error);
      showErrorToast('markNotificationAsRead Error');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const sortedNotifications: IOrderNotification[] = orderBy(data.notifications, ['createdAt'], ['desc']) as IOrderNotification[];
      setNotifications(sortedNotifications);
    }
  }, [isSuccess, data?.notifications]);

  return (
    <div className="border-grey z-20 max-h-[470px] flex flex-col justify-between rounded shadow-md border border-grey bg-slate-100 dark:bg-slate-800">
      <div className="block px-4 py-2 font-semibold text-center text-gray-700 dark:text-gray-300 border-b border-grey">Notifications</div>
      <div className="h-96 overflow-y-scroll">
        {notifications.length > 0 &&
          notifications.map((data: IOrderNotification) => (
            <div
              key={uuidv4()}
              className="border-grey max-h-[90px] border-b py-2 text-left hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => {
                console.log('data: ', data);
                if (setIsNotificationDropdownOpen) {
                  setIsNotificationDropdownOpen(false);
                }
                markNotificationAsRead(`${data._id}`);
                setTimeout(() => {
                  navigate(`/orders/${data.orderId}/activities`);
                }, 500);
              }}
            >
              <div className="flex px-4">
                <div className="flex-shrink-0 mt-1">
                  <img
                    className="rounded-full w-11 h-11 object-cover"
                    src={data.senderUsername === authUser?.username ? data.receiverPicture : data.senderPicture}
                    alt=""
                  />
                </div>
                <div className="w-full pl-3 pt-2">
                  <div className="text-sm font-normal leading-4 flex justify-between">
                    <div className="font-normal w-[85%]">
                      <span className="font-bold pr-1">
                        {data.senderUsername === authUser?.username ? data.receiverUsername : data.senderUsername}
                      </span>
                      {data.message}
                    </div>
                    {!data.isRead ? <FaRegEnvelope className="text-sky-400 mt-1" /> : <FaRegEnvelopeOpen className="text-gray-200 mt-1" />}
                  </div>
                  <div className="flex gap-2 text-xs pt-0.5">
                    <span className="font-normal">{TimeAgo.transform(data?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {notifications.length === 0 && <div className="flex h-full items-center justify-center">No notifications to show</div>}
      </div>
    </div>
  );
};

export default NotificationDropdown;
