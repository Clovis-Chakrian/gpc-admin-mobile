import { StatusBar } from 'expo-status-bar';
import StackRoutes from './src/routes/stack';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Raleway-Regular': require('./src/assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Bold': require('./src/assets/fonts/Raleway-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  };
  
  return (
    <>
      <StatusBar hidden style='light' />
      <StackRoutes />
    </>
  );
}