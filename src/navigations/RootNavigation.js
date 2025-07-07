import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* SCREENS */
import HomeScreen from "@/screen/HomeScreen/HomeScreen";
import { SplashScreen } from "@/screen/SplashScreen/SplashScreen";
import OnBoardingScreen from "@/screen/OnBoardingScreen/OnBoardingScreen";
import SignupScreen from "@/screen/SignupScreen/SignupScreen";
import LoginScreen from "@/screen/LoginScreen/LoginScreen";
import MainDrawer from "./DrawerNavigation/MainDrawer";
import AddNewFolder from "@/screen/AddNewFolder/AddNewFolder";
import { darkTheme, lightTheme } from "@/constants/THEME";
import ImagePreviewScreen from "@/screen/ImagePreviewScreen/ImagePreviewScreen";
import MoveToFolderScreen from "@/screen/MoveToFolderScreen/MoveToFolderScreen";

/* SCREENS */

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const colorScheme = useColorScheme();
  return (
    <>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          animation: "simple_push",
        }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainApp"
          component={MainDrawer} // 👈 Use this instead of HomeScreen
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddNewFolderScreen"
          component={AddNewFolder}
          options={{
            presentation: "modal", // makes it slide up like a sheet
            gestureEnabled: true, // allow pull-down to dismiss
            headerShown: true, // hide the default header if you build your own
            title: "Add New Folder",
          }}
        />

        <Stack.Screen
          name="ImagePreviewScreen"
          component={ImagePreviewScreen}
          options={{
            presentation: "modal", // makes it slide up like a sheet
            gestureEnabled: true, // allow pull-down to dismiss
            headerShown: true, // hide the default header if you build your own
          }}
        />

        <Stack.Screen
          name="MoveToFolderScreen"
          component={MoveToFolderScreen}
          options={{
            presentation: "modal", // makes it slide up like a sheet
            gestureEnabled: true, // allow pull-down to dismiss
            headerShown: true, // hide the default header if you build your own
          }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
