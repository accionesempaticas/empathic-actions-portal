'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Para móviles

  return (
      <div className="min-h-screen flex bg-gradient-to-br from-primary-50 to-accent-50">
          <Sidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          <div className="flex-1 flex flex-col h-screen max-h-screen">
              <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

              <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                  <main className="flex-1 overflow-y-auto pt-6">
                      {children}
                  </main>
              </div>

              <Footer />
          </div>
      </div>
  );
};

export default MainLayout; 