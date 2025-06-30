// src/App.js
import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigations/RootNavigation";
import { useFonts } from "expo-font";
import { VaultProvider, VaultContext } from "@/vault/VaultProvider";
import { SplashScreen } from "./screen/SplashScreen/SplashScreen";

function InnerApp() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "ProductSans-Regular": require("../assets/fonts/ProductSans-Regular.ttf"),
    "ProductSans-Medium": require("../assets/fonts/ProductSans-Medium.ttf"),
    "ProductSans-Bold": require("../assets/fonts/ProductSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

export default function App() {
  return (
    <VaultProvider>
      <InnerApp />
    </VaultProvider>
  );
}
