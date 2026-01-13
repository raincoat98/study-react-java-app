import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import useAuthStore from './store/authStore';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import TodoPage from './pages/TodoPage';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated, initAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  // 초기화 완료 전까지 아무것도 렌더링하지 않음
  if (!isInitialized) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/todos"
            element={isAuthenticated ? <TodoPage /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
