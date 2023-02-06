import { StatusBar } from 'expo-status-bar';
import StackRoutes from './src/routes/stack';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [token, setToken] = useState<string | null>();

  async function pickToken() {
    const token = await AsyncStorage.getItem('token');

    setToken(token)
  };

  useEffect(() => {
    pickToken();
  }, []);

  const [fontsLoaded] = useFonts({
    'Raleway-Regular': require('./src/assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Bold': require('./src/assets/fonts/Raleway-Bold.ttf'),
  });

  if (!fontsLoaded ) { //|| token == undefined
    return null;
  };

  return (
    <>
      <StatusBar hidden style='light' />
      <StackRoutes
        isLogged={token ? true : false}
      />
    </>
  );
}