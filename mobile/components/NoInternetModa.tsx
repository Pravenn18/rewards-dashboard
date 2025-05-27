import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useNetworkStore } from '@/store/networkState';

export const NoInternetCard = () => {
  const isConnected = useNetworkStore((state) => state.isConnected);
  const [status, setStatus] = useState<'offline' | 'checking' | 'online'>('offline');
  const shakeAnimation = useSharedValue(0);
  const timeoutRef = useRef<number | null>(null);

  const triggerShake = useCallback(() => {
    shakeAnimation.value = withSequence(
      withTiming(-2, { duration: 50 }),
      withRepeat(withTiming(2, { duration: 60 }), 10, true),
      withTiming(0, { duration: 50 })
    );
  }, []);

  const handleTryAgain = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStatus('checking');

    timeoutRef.current = setTimeout(() => {
      if (useNetworkStore.getState().isConnected) {
        setStatus('online');
        timeoutRef.current = setTimeout(() => setStatus('offline'), 3000); // auto hide after 3s
      } else {
        setStatus('offline');
        triggerShake();
      }
    }, 3000);
  }, [triggerShake]);

  useEffect(() => {
    if (!isConnected && status !== 'checking') {
      setStatus('offline');
      triggerShake();
    }
  }, [isConnected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${shakeAnimation.value}deg` }],
  }));

  const getBackgroundColor = () => {
    switch (status) {
      case 'online':
        return '#4CAF50'; // green
      case 'checking':
        return '#FFA726'; // orange
      default:
        return '#D32F2F'; // red
    }
  };

  if (status === 'offline' && isConnected) return null;

  return (
    <Animated.View style={[styles.container, { backgroundColor: getBackgroundColor() }, animatedStyle]}>
      <View style={styles.leftSection}>
        <Text style={styles.messageText}>
          {status === 'online'
            ? 'Internet Restored'
            : status === 'checking'
            ? 'Checking connection...'
            : 'No Internet connection!'}
        </Text>
      </View>
      {status === 'offline' && (
        <Pressable onPress={handleTryAgain} style={styles.tryAgainButton}>
          <Text style={styles.tryAgainText}>Try Again</Text>
        </Pressable>
      )}
    </Animated.View>
  );
};

export default NoInternetCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 12,
    position: 'absolute',
    top: 50,
    zIndex: 1000,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 8,
  },
  tryAgainButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tryAgainText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
