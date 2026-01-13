import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const TodoPage = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
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
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Todo List</h1>
              <p className="text-sm text-gray-600">{user?.name}님 환영합니다!</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              로그아웃
            </button>
          </div>
          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
            >
              프로필
            </Link>
            <Link
              to="/todos"
              className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600"
            >
              할 일 목록
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <TodoForm />
          <TodoList />
        </div>
      </main>
    </div>
  );
};

export default TodoPage;
