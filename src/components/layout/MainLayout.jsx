'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Para móviles

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="pt-12 px-4 lg:px-6 flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout; 