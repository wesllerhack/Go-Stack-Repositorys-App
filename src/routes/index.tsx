import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RepositoryPage from './pages/Repository';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/repositories/:repository/:name"
          element={<RepositoryPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
