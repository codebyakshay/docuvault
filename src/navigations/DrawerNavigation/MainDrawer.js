import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right", // 👈 to open from right
        drawerType: "slide", // optional: can be 'front', 'back', 'slide', or 'permanent'
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250, // adjust width
        },
      }}
    >
      <Drawer.Screen name="DocuVault" component={BottomTabs} />
    </Drawer.Navigator>
  );
}
