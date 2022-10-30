import React from 'react';
import AppRoutes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <GlobalStyle />
    </>
  );
};

export default App;
