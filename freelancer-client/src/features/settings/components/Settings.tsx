import { FC, ReactElement } from 'react';

import ChangePassword from './ChangePassword';

const Settings: FC = (): ReactElement => {
  return (
    <div className="mx-auto px-6 flex items-center flex-col container">
      <div className="w-[90%] sm:w-[70%] lg:w-[50%] max-w-[600px] bg-blue-200/60 dark:bg-blue-900/60 px-6 pt-5 pb-7 mt-6 rounded">
        <ChangePassword />
      </div>
    </div>
  );
};

export default Settings;
