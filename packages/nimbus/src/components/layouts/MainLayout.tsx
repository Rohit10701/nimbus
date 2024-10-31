import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Header from '../common/headers';

function MainLayout() {
  return (
    <div className='h-screen p-2'>
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;