import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { dashboard_route } from './data';
import { PATH_MAIN } from './pages';
import AuthGuard from '../guards/AuthGuard';
import { GatewayProcessor } from '../container/gateway-processor';

const DashboardRoute = () => (
  <Routes>
    {dashboard_route.map((route) => (
      <Route key={route.id} path={route.path} element={route.component} />
    ))}
  </Routes>
);

const Routers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path={'/'} element={<GatewayProcessor />} />
          <Route
            path={`${PATH_MAIN.DASHBOARD}/*`}
            element={
              <AuthGuard>
                <DashboardRoute />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default Routers;
