import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Header from '../common/headers';

function MainLayout() {
  return (
    <div className='min-h-screen p-2 flex flex-col overflow-auto'>
      <header role="banner">
        <Header />
      </header>
      <main role="main" className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;