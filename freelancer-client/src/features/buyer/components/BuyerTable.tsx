// l. 465
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { IOrderDocument, IOrderTableProps } from 'src/features/order/interfaces/order.interface';
import { TimeAgo } from 'src/shared/utils/timeago.utils'; // l. 497
import { lowerCase } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

const BuyerTable: FC<IOrderTableProps> = ({ type, orders, orderTypes }): ReactElement => {
  return (
    <div className="flex flex-col">
      <div className="border-grey border border-b-0 px-3 py-3">
        <div className="text-slate-700 dark:text-slate-400 text-xs font-bold uppercase sm:text-sm md:text-base">{type} orders </div>
      </div>
      <table className="border-grey flex-no-wrap flex w-full table-auto flex-row overflow-hidden border text-sm lg:text-base text-slate-800 dark:text-slate-300 sm:inline-table">
        {orderTypes > 0 ? (
          <>
            <thead className="border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden">
              {orders.map(() => (
                <tr
                  key={uuidv4()}
                  className="mb-1 flex flex-col flex-nowrap bg-sky-500 text-slate-900 dark:text-slate-200 sm:mb-0 sm:table-row md:table-row lg:bg-transparent lg:text-black"
                >
                  <th className="p-3 text-center md:w-[6%]">
                    <span className="block lg:hidden">Image</span>
                  </th>
                  <th className="p-3 text-center md:w-[40%]">
                    <span className="block lg:hidden">Title</span>
                  </th>
                  <th className="p-3 text-center">Order Date</th>
                  <th className="p-3 text-center">{type === 'cancelled' ? 'Cancelled On' : 'Due On'}</th>
                  <th className="p-3 text-center">Total</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {orders.map((order: IOrderDocument) => (
                <tr
                  key={uuidv4()}
                  className="border-grey mb-2 flex flex-col flex-nowrap border-b bg-slate-300 dark:bg-slate-800 sm:mb-0 sm:table-row "
                >
                  <td className="px-3 py-3 lg:flex lg:justify-center">
                    <img className="h-6 w-10 object-cover lg:h-8 lg:w-11" src={order.gigCoverImage} alt="Gig cover image" />
                  </td>
                  <td className="p-3 text-left">
                    <div className="grid">
                      <Link
                        to={`/orders/${order.orderId}/activities`}
                        className="truncate text-sm lg:text-base font-normal hover:text-sky-500"
                      >
                        {order.gigBasicTitle}
                      </Link>
                    </div>
                  </td>
                  <td className="p-3 text-left lg:text-center">{TimeAgo.dayMonthYear(`${order.dateOrdered}`)}</td>
                  <td className="p-3 text-left lg:text-center">
                    {type === 'cancelled'
                      ? TimeAgo.dayMonthYear(`${order.approvedAt}`)
                      : TimeAgo.dayMonthYear(`${order.offer.newDeliveryDate}`)}
                  </td>
                  <td className="p-3 text-left lg:text-center">${order.price}</td>
                  <td className="px-3 py-1 text-left lg:p-3 lg:text-center">
                    <span
                      className={`status rounded bg-transparent p-0 text-xs font-bold uppercase text-slate-800 dark:text-slate-200 sm:px-[5px] sm:py-[4px] sm:text-slate-800 dark:sm:text-slate-200 ${lowerCase(
                        order.status.replace(/ /g, '')
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td className="w-full px-4 py-2 text-sm xl:text-base text-slate-700 dark:text-slate-300 lg:text-base">
                No {type} orders to show.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default BuyerTable;
