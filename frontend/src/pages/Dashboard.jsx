import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            로그아웃
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            환영합니다, {user?.name || 'User'}님!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">이메일</h3>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">이름</h3>
              <p className="text-gray-600">{user?.name}</p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">상태</h3>
              <p className="text-gray-600">로그인됨</p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">사용자 정보</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
