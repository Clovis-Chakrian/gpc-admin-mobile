import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { StackParamList } from '../@types/routes';
import { Login, Config, PickContact, Messages, CreateEvent, CreateNotice } from '../screens';
import { Header, AlternativeHeader } from '../components';

import BottonTabsRoutes from './bottomTabs';

const Stack = createStackNavigator<StackParamList>();

const StackRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Home"
          component={BottonTabsRoutes}
          options={{
            header: Header
          }}
        />

        <Stack.Screen
          name="Config"
          component={Config}
          options={{
            header: AlternativeHeader
          }}
        />

        <Stack.Screen
          name="PickContact"
          component={PickContact}
          options={{
            header: AlternativeHeader
          }}
        />

        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{
            header: AlternativeHeader
          }}
        />

        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent}
          options={{
            header: AlternativeHeader
          }}
        />

        <Stack.Screen
          name="CreateNotice"
          component={CreateNotice}
          options={{
            header: AlternativeHeader
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackRoutes;