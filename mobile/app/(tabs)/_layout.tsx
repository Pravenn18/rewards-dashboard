import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { rewardsService } from '@/services/rewardService';
import { useNetworkStore } from '@/store/networkState';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loading, isLoading] = useState(false);
  
  const { fetchPoints, fetchTransactions, fetchCategories} = rewardsService;
  const isConnected = useNetworkStore((state) => state.isConnected);

  useEffect(() => {
    const fetch = async() => {
      isLoading(true);
      await fetchPoints();
      await fetchTransactions();
      await fetchCategories();
      isLoading(false);
    }
    fetch();
  }, [!isConnected])

  if(loading) return <ActivityIndicator size="large" style={{flex: 1}}/>

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
