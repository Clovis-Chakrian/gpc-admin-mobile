import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import { Notices } from "../screens";
import { colors } from "../globalStyles";

const BottomTabs = createBottomTabNavigator();

const BottonTabsRoutes = () => {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.secondary[1]
    }}>
      <BottomTabs.Screen
        component={Notices}
        name="Mural"
        options={{
          tabBarIcon: () => <Ionicons name="clipboard-outline" color={colors.secondary[0]} size={28} />,
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottonTabsRoutes;