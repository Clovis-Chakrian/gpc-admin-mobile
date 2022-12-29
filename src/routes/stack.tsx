import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens';
import { Header, AlternativeHeader } from '../components';

import BottonTabsRoutes from './bottomTabs';

const Stack = createStackNavigator();

const StackRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={BottonTabsRoutes}
          options={{
            header: Header
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackRoutes;