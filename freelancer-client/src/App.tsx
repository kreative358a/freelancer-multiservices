/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { FC, ReactElement, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppRouter from './AppRoutes';
import useBeforeWindowUnload from './shared/hooks/useBeforeWindowUnload';
import { socketService } from './sockets/socket.service';

const App: FC = (): ReactElement => {
  // l. 610
  useBeforeWindowUnload();

  // 567
  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="w-screen min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col relative">
          <AppRouter />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
