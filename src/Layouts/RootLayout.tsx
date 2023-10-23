import { AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
    </>
  );
};

export default RootLayout;
