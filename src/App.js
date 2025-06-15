// src/App.js
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme, View, Text } from "react-native";

//Screens

import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigations/RootNavigation";
import { useFonts } from "expo-font";

export default function App() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "ProductSans-Regular": require("../assets/fonts/ProductSans-Regular.ttf"),
    "ProductSans-Medium": require("../assets/fonts/ProductSans-Medium.ttf"),
    "ProductSans-Bold": require("../assets/fonts/ProductSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <>
      {colorScheme === "dark" ? (
        <StatusBar style="light" />
      ) : (
        <StatusBar style="dark" />
      )}

      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}
