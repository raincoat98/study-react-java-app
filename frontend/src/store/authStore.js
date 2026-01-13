import { create } from 'zustand';
import jwtDecode from 'jwt-decode';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // 초기화 - 로컬 스토리지에서 토큰 복원
  initAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          set({
            user: decoded,
            isAuthenticated: true,
          });
        } else {
          localStorage.removeItem('token');
          set({ isAuthenticated: false, user: null });
        }
      } catch (error) {
        localStorage.removeItem('token');
        set({ isAuthenticated: false, user: null });
      }
    }
  },

  // 로그인
  login: (user, token) => {
    localStorage.setItem('token', token);
    set({
      user,
      isAuthenticated: true,
      error: null,
    });
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // 에러 설정
  setError: (error) => {
    set({ error });
  },

  // 로딩 설정
  setLoading: (isLoading) => {
    set({ isLoading });
  },

  // 에러 초기화
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
