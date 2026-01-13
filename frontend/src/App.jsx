import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import useAuthStore from './store/authStore';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import About from './pages/About';
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
          {/* 로그인 없이 접근 가능 */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* 로그인 필요 */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
