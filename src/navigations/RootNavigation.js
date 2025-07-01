import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* SCREENS */
import HomeScreen from "@/screen/HomeScreen/HomeScreen";
import { SplashScreen } from "@/screen/SplashScreen/SplashScreen";
import OnBoardingScreen from "@/screen/OnBoardingScreen/OnBoardingScreen";
import SignupScreen from "@/screen/SignupScreen/SignupScreen";
import LoginScreen from "@/screen/LoginScreen/LoginScreen";
import MainDrawer from "./DrawerNavigation/MainDrawer";

/* SCREENS */

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="MainApp"
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
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
