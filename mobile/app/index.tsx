import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getStoredUser } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export default function Index() {
  const [checking, setChecking] = useState(true);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      const data = await getStoredUser();
      if (data?.user) setUser(data.user);
      setChecking(false);
    };
    checkAuth();
  }, []);

  if (checking) return null;

  return <Redirect href={user ? '/(tabs)' : '/(auth)/login'} />;
}
