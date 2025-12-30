import React, { useState } from 'react';
import { ViewType } from '../types';
import DashboardView from './DashboardView';
import TeachersView from './TeachersView';
import DepartmentsView from './DepartmentsView';
import ReportsView from './ReportsView';
import { DashboardIcon, UsersIcon, BuildingLibraryIcon, ChartBarIcon } from './icons';

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'text-white bg-church-blue-700'
        : 'text-gray-300 hover:text-white hover:bg-church-blue-800'
    } rounded-lg`}
  >
    {icon}
    <span className="ml-4">{label}</span>
  </button>
);

const Sidebar: React.FC<{
  currentView: ViewType;
  setView: (view: ViewType) => void;
}> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { id: 'teachers', label: 'Zirtirtute', icon: <UsersIcon className="w-5 h-5" /> },
    { id: 'departments', label: 'Department-te', icon: <BuildingLibraryIcon className="w-5 h-5" /> },
    { id: 'reports', label: 'Report-te', icon: <ChartBarIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-church-blue-900 text-white">
      <div className="flex flex-col items-center justify-center p-4 border-b border-church-blue-800 space-y-2">
        <img src="https://i.ibb.co/R4Vqpms1/pci-logo.png" alt="PCI Logo" className="w-16 h-16" />
        <h1 className="text-lg font-semibold tracking-tight text-center">ITI Veng Kohhran Sunday School Zirtirtute</h1>
      </div>
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={currentView === item.id}
            onClick={() => setView(item.id as ViewType)}
          />
        ))}
      </div>
    </div>
  );
};

const Layout: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'teachers':
        return <TeachersView />;
      case 'departments':
        return <DepartmentsView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView />;
    }
  };
  
  const viewTitles: { [key in ViewType]: string } = {
    dashboard: 'Dashboard',
    teachers: 'Zirtirtute',
    departments: 'Department-te',
    reports: 'Report-te',
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
           <h2 className="text-2xl font-semibold text-gray-700 capitalize">{viewTitles[currentView]}</h2>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Layout;