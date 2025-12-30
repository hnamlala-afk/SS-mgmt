
import React from 'react';
import { DataProvider } from './context/AppContext';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <DataProvider>
      <Layout />
    </DataProvider>
  );
};

export default App;
