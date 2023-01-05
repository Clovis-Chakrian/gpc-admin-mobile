import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { BottomTabsParamList } from '../@types/routes';

import { Notices, Agenda, Schedules } from "../screens";
import { colors } from "../globalStyles";

const BottomTabs = createBottomTabNavigator();

const BottonTabsRoutes = () => {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.secondary[1],
      tabBarInactiveTintColor: '#616161',
    }}>
      <BottomTabs.Screen
        component={Notices}
        name="Notices"
        options={{
          tabBarIcon: () => <Ionicons name="clipboard-outline" color={colors.secondary[0]} size={28} />,
          title: 'Mural'
        }}
      />

      <BottomTabs.Screen
        component={Agenda}
        name="Agenda"
        options={{
          tabBarIcon: () => <Ionicons name="calendar-outline" color={colors.secondary[0]} size={28} />,
        }}
      />

      <BottomTabs.Screen
        component={Schedules}
        name="Horários"
        options={{
          tabBarIcon: () => <Ionicons name="reader-outline" color={colors.secondary[0]} size={28} />,
        }}
      />

      <BottomTabs.Screen
        component={Notices}
        name="Solicitações"
        options={{
          tabBarIcon: () => <Ionicons name="folder-open-outline" color={colors.secondary[0]} size={28} />,
        }}
      />

      <BottomTabs.Screen
        component={Notices}
        name="Notícias"
        options={{
          tabBarIcon: () => <Ionicons name="newspaper-outline" color={colors.secondary[0]} size={28} />,
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottonTabsRoutes;