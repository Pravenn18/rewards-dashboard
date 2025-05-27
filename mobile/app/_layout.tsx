import NoInternetCard from '@/components/NoInternetModa';
import { ThemeProvider } from '@/context/themeContext';
import { Stack } from 'expo-router';
import { View } from 'react-native';

//TODO: NOT TESTED NO INTERNET CARD, NEED TO GIVE PREVIW BUILD FOR THAT
export default function RootLayout() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <NoInternetCard />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ThemeProvider>
  );
}
