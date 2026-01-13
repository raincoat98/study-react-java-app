import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const About = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Todo App
            </Link>
            <div className="flex gap-4 items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-semibold transition duration-200"
              >
                홈
              </Link>
              <Link
                to="/about"
                className="text-blue-600 font-semibold border-b-2 border-blue-600"
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

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Todo App</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">소개</h2>
              <p className="text-gray-600 leading-relaxed">
                Todo App은 개인의 일정 관리를 효율적으로 도와주는 현대적인 웹 애플리케이션입니다.
                React와 Spring Boot를 사용하여 구축되었으며, 사용자 인증 및 할 일 관리 기능을
                제공합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">주요 기능</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">✓</span>
                  <span className="text-gray-600">
                    <strong>회원 인증:</strong> 안전한 JWT 기반 사용자 인증
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">✓</span>
                  <span className="text-gray-600">
                    <strong>할 일 관리:</strong> 할 일 추가, 수정, 삭제, 완료 표시
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">✓</span>
                  <span className="text-gray-600">
                    <strong>사용자 프로필:</strong> 개인 정보 조회 및 관리
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">✓</span>
                  <span className="text-gray-600">
                    <strong>반응형 디자인:</strong> 모든 기기에서 최적화된 UI
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">기술 스택</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-800 mb-2">Frontend</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• React 19</li>
                    <li>• Vite</li>
                    <li>• Tailwind CSS</li>
                    <li>• Zustand</li>
                    <li>• Axios</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-bold text-gray-800 mb-2">Backend</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Spring Boot 3.2</li>
                    <li>• Spring Security</li>
                    <li>• JWT</li>
                    <li>• JPA/Hibernate</li>
                    <li>• H2 Database</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">시작하기</h2>
              {isAuthenticated ? (
                <p className="text-gray-600 mb-4">
                  이미 로그인되어 있습니다. 대시보드로 이동하세요!
                </p>
              ) : (
                <p className="text-gray-600 mb-4">
                  Todo App을 사용하려면 먼저 회원가입 또는 로그인을 해주세요.
                </p>
              )}
              <div className="flex gap-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                    >
                      대시보드로 이동
                    </Link>
                    <Link
                      to="/todos"
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                    >
                      할 일 목록
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                    >
                      로그인
                    </Link>
                    <Link
                      to="/register"
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
