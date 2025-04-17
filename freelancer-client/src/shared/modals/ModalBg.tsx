import { FC, ReactElement } from 'react';

import { IModalBgProps } from './interfaces/modal.interface';

const ModalBg: FC<IModalBgProps> = ({ children }): ReactElement => {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 h-full w-full z-[121] overflow-hidden backdrop-blur-[2px]">
      <div className="py-2 z-10 absolute top-0 right-0 left-0 bottom-0 bg-slate-300/80 dark:bg-slate-900/80">{children}</div>
    </div>
  );
};

export default ModalBg;
