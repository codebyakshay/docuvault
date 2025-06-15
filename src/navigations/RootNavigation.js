import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* SCREENS */
import HomeScreen from "@/screen/HomeScreen/HomeScreen";
import SplashScreen from "@/screen/SplashScreen/SplashScreen";
import OnBoardingScreen from "@/screen/OnBoardingScreen/OnBoardingScreen";

/* SCREENS */

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName="OnBoardingScreen">
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

      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
