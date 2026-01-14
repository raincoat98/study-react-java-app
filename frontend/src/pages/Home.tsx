import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Home: FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Todo App
            </Link>
            <div className="flex gap-4 items-center">
              <Link
                to="/"
                className="text-blue-600 font-semibold border-b-2 border-blue-600"
              >
                홈
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
              >
                소개
              </Link>
              {isAuthenticated ? (
                <>
                  <span className="text-gray-600 text-sm">{user?.name}님</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Your Todo List, Your Way
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              효율적인 일정 관리로 생산성을 높이세요. 간단하고 강력한 Todo 앱으로
              하루를 체계적으로 관리하세요.
            </p>
            {isAuthenticated ? (
              <div className="flex gap-4 justify-center">
                <Link
                  to="/todos"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200"
                >
                  할 일 시작하기
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-8 rounded-lg text-lg transition duration-200"
                >
                  프로필 보기
                </Link>
              </div>
            ) : (
              <div className="flex gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200"
                >
                  지금 시작하기
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-8 rounded-lg text-lg transition duration-200"
                >
                  로그인
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
              특징
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-500">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">쉬운 사용</h3>
                <p className="text-gray-600">
                  직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.
                </p>
              </div>
              <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-500">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">안전한 인증</h3>
                <p className="text-gray-600">
                  JWT 기반 보안 인증으로 개인 정보를 보호합니다.
                </p>
              </div>
              <div className="bg-purple-50 p-8 rounded-lg border-l-4 border-purple-500">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">반응형 디자인</h3>
                <p className="text-gray-600">
                  모든 기기에서 완벽하게 작동합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              지금 바로 시작하세요!
            </h2>
            <p className="text-white mb-8 text-lg">
              {isAuthenticated
                ? '할 일 목록에서 새로운 작업을 추가해보세요.'
                : '무료로 가입하고 효율적인 일정 관리를 시작하세요.'}
            </p>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition duration-200 inline-block"
              >
                지금 가입하기
              </Link>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 Todo App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
