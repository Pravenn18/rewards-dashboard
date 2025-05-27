import { useRewardStore } from '@/store/rewardStore';
import React, { useEffect } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DashboardScreen = () => {
  const { points, transactions } = useRewardStore();

  return (
    <SafeAreaView className="p-4">
      <Text className="text-2xl font-bold mb-2">Reward Points: {points}</Text>

      <Text className="text-xl mt-4 font-semibold">Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="border p-2 my-1 rounded-md">
            <Text>{item.category}</Text>
            <Text>{item.date} - {item.points} pts</Text>
          </View>
        )}
      />

      <Button title="Redeem Points" onPress={() => { /* open modal */ }} />
    </SafeAreaView>
  );
};
