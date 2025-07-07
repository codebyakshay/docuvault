import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";

import DocumentManagerScreen from "@/screen/DocumentManagerScreen/DocumentManagerScreen";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerPosition: "right", // 👈 to open from right
        drawerType: "slide", // optional: can be 'front', 'back', 'slide', or 'permanent'
        drawerStyle: {
          // backgroundColor: "#fff",
          width: 350, // adjust width
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={BottomTabs} />
      <Drawer.Screen
        name="Document Manager"
        component={DocumentManagerScreen}
        options={{
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
}
