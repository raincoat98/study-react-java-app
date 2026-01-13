import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosConfig';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, setError, clearError } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials) =>
      axiosInstance.post('/auth/login', credentials),
    onSuccess: (response) => {
      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    },
    onError: (error) => {
      setError(error.response?.data?.message || '로그인 실패');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력하세요');
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          로그인
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {loginMutation.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {loginMutation.error?.response?.data?.message || '로그인 실패'}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          계정이 없으신가요?{' '}
          <Link to="/register" className="text-blue-500 hover:underline font-semibold">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
