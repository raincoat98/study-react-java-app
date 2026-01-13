import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../api/axiosConfig';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  error: null,

  // 초기화 - 로컬 스토리지에서 토큰 복원 및 사용자 정보 조회
  initAuth: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          // 토큰이 유효하면 백엔드에서 사용자 정보 조회
          try {
            const response = await axiosInstance.get('/auth/me');
            set({
              user: response.data,
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
            });
          } catch {
            // 사용자 정보 조회 실패 시 최소한의 정보만 사용
            set({
              user: { email: decoded.sub },
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
            });
          }
        } else {
          localStorage.removeItem('token');
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            isInitialized: true,
          });
        }
      } catch {
        localStorage.removeItem('token');
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          isInitialized: true,
        });
      }
    } else {
      set({
        isLoading: false,
        isInitialized: true,
      });
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
