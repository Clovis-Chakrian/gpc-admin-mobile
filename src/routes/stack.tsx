import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackParamList } from '../@types/routes';
import { Login, Config, PickContact, Messages, CreateEvent, CreateNotice, EditEvent, EditNotice, CreateParentsAccount, CreateNews, EditAccount } from '../screens';
import { Header, AlternativeHeader } from '../components';

import BottonTabsRoutes from './bottomTabs';
import { useEffect, useState } from 'react';

const Stack = createStackNavigator<StackParamList>();

interface RoutesProps {
  isLogged: boolean
}

const StackRoutes = ({ isLogged }: RoutesProps) => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}

        initialRouteName={isLogged ? 'Home' : 'Login'}
      >


        {
          isLogged ?
            <>
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
                name="EditAccount"
                component={EditAccount}
                options={{
                  header: AlternativeHeader
                }}
              />

              <Stack.Screen
                name="CreateParentsAccount"
                component={CreateParentsAccount}
                options={{
                  header: AlternativeHeader
                }}
              />


              <Stack.Screen
                name="CreateNews"
                component={CreateNews}
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
                name="EditEvent"
                component={EditEvent}
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

              <Stack.Screen
                name="EditNotice"
                component={EditNotice}
                options={{
                  header: AlternativeHeader
                }}
              />
            </>
            :

            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false
              }}
            />
        }


      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default StackRoutes;