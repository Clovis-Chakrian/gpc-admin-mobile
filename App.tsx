import { StatusBar } from 'expo-status-bar';
import Notices from './src/screens/Notices';
import StackRoutes from './src/routes/stack';

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <StackRoutes />
    </>
  );
}