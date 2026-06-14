import { useState, useEffect, useCallback } from 'react';
import { isAuthenticated, getCurrentUser } from '../api/authAPI';

/**
 * 로그인 상태를 관리하는 커스텀 훅
 * 
 * 사용 예시:
 *   const { isLoggedIn, setIsLoggedIn, user } = useAuth();
 */
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [user, setUser] = useState(getCurrentUser());

  // 다른 탭에서 로그인/로그아웃 시 자동 동기화
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(isAuthenticated());
      setUser(getCurrentUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { isLoggedIn, setIsLoggedIn, user, setUser };
};
