// l. 470
import { FC, ReactElement } from 'react';
import { FaCircleNotch } from 'react-icons/fa';

const CircularPageLoader: FC = (): ReactElement => {
  return (
    <div className="bg-slate-300/40 dark:bg-slate-700/40 backdrop-blur flex justify-center items-center z-50 left-0 top-0 absolute h-full w-full">
      <FaCircleNotch
        className="animate-spin h-12 w-12 lg:h-24 lg:w-20 2xl:h-48 2xl:w-48 mr-3 text-blue-800 dark:text-blue-400"
        // size={40}
        // color="dark:#50b5ff #2c51a0"
      />
    </div>
  );
};

export default CircularPageLoader;
