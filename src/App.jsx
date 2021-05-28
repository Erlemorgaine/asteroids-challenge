import React, { memo, Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));

import './App.scss';

const App = () => (
  <div className="app-layout">
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  </div>
)

export default memo(App)
