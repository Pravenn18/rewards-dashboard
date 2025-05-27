import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getStoredUser } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { ActivityIndicator } from 'react-native';
import NetInfo  from "@react-native-community/netinfo";
import { useNetworkStore } from '@/store/networkState';

export default function Index() {
  const [checking, setChecking] = useState(true);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const setIsConnected = useNetworkStore((state) => state.setIsConnected);

  useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(!!state.isConnected)
  });
  return(() => {
    unsubscribe();
  })
  })
  useEffect(() => {
    const checkAuth = async () => {
      const data = await getStoredUser();
      if (data?.user) setUser(data.user);
      setChecking(false);
    };
    checkAuth();
  }, []);

  if (checking) return <ActivityIndicator size="small" style={{flex: 1}}/>

  return (
    <Redirect href={user ? '/(tabs)' : '/(auth)/login'} />
  )
}
