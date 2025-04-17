import { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IOrderDocument } from 'src/features/order/interfaces/order.interface';
import { useGetOrdersByBuyerIdQuery } from 'src/features/order/services/order.service';
import { orderTypes, shortenLargeNumbers } from 'src/shared/utils/utils.service';
import { socket, socketService } from 'src/sockets/socket.service';

import BuyerTable from './BuyerTable';

const BUYER_GIG_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in progress',
  DELIVERED: 'delivered'
};

const BuyerDashboard: FC = (): ReactElement => {
  const [type, setType] = useState<string>(BUYER_GIG_STATUS.ACTIVE);

  // l. 604
  const { buyerId } = useParams<string>();
  const { data, isSuccess } = useGetOrdersByBuyerIdQuery(`${buyerId}`);
  let orders: IOrderDocument[] = [];
  if (isSuccess) {
    orders = data.orders as IOrderDocument[];
  }

  // l. 567
  useEffect(() => {
    socketService.setupSocketConnection();
    socket.emit('getLoggedInUsers', '');
  }, []);

  return (
    <div className="container mx-auto mt-8 px-6 md:px-10 lg:px-6 xl:px-4">
      <div className="flex flex-col flex-wrap">
        <div className="mb-8 px-4 text-xl font-semibold text-blue-900/90 dark:text-blue-300/90 hover:text-blue-900 dark:hover:text-blue-300 md:px-0 md:text-2xl lg:text-4xl">
          Manage Orders Buyer
        </div>
        <div className="p-0 mb-1">
          <ul className="flex w-full cursor-pointer list-none flex-col flex-wrap rounded-[2px] sm:flex-none sm:flex-row">
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.ACTIVE)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-blue-900/90 dark:text-blue-300/90 hover:text-blue-900 dark:hover:text-blue-300 no-underline sm:text-sm md:text-base ${
                  type === BUYER_GIG_STATUS.ACTIVE
                    ? 'pb-[15px] font-semibold outline outline-2 outline-gray-600 dark:outline-gray-400 sm:rounded-t-lg'
                    : ''
                }`}
              >
                Active
                {orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders) > 0 && (
                  <span className="ml-1 rounded-[5px] dark:bg-gray-600 px-[5px] py-[1px] text-xs font-medium text-blue-800 dark:text-blue-400">
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.COMPLETED)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-blue-900/90 dark:text-blue-300/90 hover:text-blue-900 dark:hover:text-blue-300 no-underline sm:text-sm md:text-base ${
                  type === BUYER_GIG_STATUS.COMPLETED
                    ? 'pb-[15px] outline outline-2 font-semibold outline-gray-600 dark:outline-gray-400 sm:rounded-t-lg'
                    : ''
                }`}
              >
                Completed
                {orderTypes(BUYER_GIG_STATUS.COMPLETED, orders) > 0 && (
                  <span className="ml-1 rounded-[5px] dark:bg-gray-600 px-[5px] py-[1px] text-xs font-medium text-blue-800 dark:text-blue-400">
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.COMPLETED, orders))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.CANCELLED)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-blue-900/90 dark:text-blue-300/90 hover:text-blue-900 dark:hover:text-blue-300 no-underline sm:text-sm md:text-base ${
                  type === BUYER_GIG_STATUS.CANCELLED
                    ? 'pb-[15px] outline outline-2 font-semibold outline-gray-600 dark:outline-gray-400 sm:rounded-t-lg'
                    : ''
                }`}
              >
                Cancelled
                {orderTypes(BUYER_GIG_STATUS.CANCELLED, orders) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-gray-300 dark:bg-gray-600 px-[5px] py-[1px] text-xs font-medium text-blue-800 dark:text-blue-400">
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.CANCELLED, orders))}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>

        {type === BUYER_GIG_STATUS.ACTIVE && (
          <BuyerTable type="active" orders={orders} orderTypes={orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders)} />
        )}
        {type === BUYER_GIG_STATUS.COMPLETED && (
          <BuyerTable type="completed" orders={orders} orderTypes={orderTypes(BUYER_GIG_STATUS.COMPLETED, orders)} />
        )}
        {type === BUYER_GIG_STATUS.CANCELLED && (
          <BuyerTable type="cancelled" orders={orders} orderTypes={orderTypes(BUYER_GIG_STATUS.CANCELLED, orders)} />
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
