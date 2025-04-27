import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import AppPage from './pages/AppPage';
import { useSessionStore } from './store/session';

import { useTokenRefresh } from './features/useTokenRefresh';

function RouterApp() {
  const accessToken = useSessionStore(s => s.accessToken);
  useTokenRefresh();
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={() => window.location.replace('/app')} />} />
        <Route path="/app" element={accessToken ? <AppPage /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={accessToken ? '/app' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
