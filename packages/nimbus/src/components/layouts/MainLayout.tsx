import { Outlet } from '@tanstack/react-router';
import Header from '../common/headers';

function MainLayout() {
  return (
    <div className='h-screen p-1'>
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;