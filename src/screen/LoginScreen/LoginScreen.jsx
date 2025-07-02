import { View, Text, useColorScheme, Image, Alert } from "react-native";
import { styles } from "./styles";
import { darkTheme, lightTheme } from "@/constants/THEME";
import IMAGES from "@/constants/IMAGES";
import Button from "@/constants/Button";

import * as LocalAuthentication from "expo-local-authentication";
import { storage } from "@/utils/storage";

//icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

//
//
export default function LoginScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function handleLogin() {
    setIsLoggingIn(true);

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supported =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && supported.length > 0 && enrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access your vault",
        fallbackLabel: "Use device passcode",
        disableDeviceFallback: false,
      });

      if (result.success) {
        storage.set("isLoggedIn", true);
        setIsLoggingIn(false);
        navigation.replace("MainApp");
      } else {
        Alert.alert("Authentication Failed", "Please try again.");
        setIsLoggingIn(false);
      }
    } else {
      Alert.alert(
        "Biometric Auth Not Available",
        "Your device doesn't support biometrics."
      );
      setIsLoggingIn(false);
    }
  }
  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor:
            colorScheme === "dark"
              ? darkTheme.colors.BACKGROUND
              : lightTheme.colors.BACKGROUND,
        },
      ]}
    >
      <View style={styles.topConatiner}>
        <View style={styles.topImageContainer}>
          <Image
            source={IMAGES.LOGO[colorScheme]}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View>
        <Text
          style={[
            styles.topTextStyle,
            {
              color:
                colorScheme === "dark"
                  ? darkTheme.colors.PRIMARY
                  : lightTheme.colors.PRIMARY,
            },
          ]}
        >
          Log in with biomatrics or pin code
        </Text>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="face-recognition"
            size={24}
            color={colorScheme === "dark" ? "black" : "white"}
          />
        </View>

        <View style={styles.iconContainer}>
          <Ionicons
            name="finger-print-outline"
            size={24}
            color={colorScheme === "dark" ? "black" : "white"}
          />
        </View>

        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="account-lock"
            size={24}
            color={colorScheme === "dark" ? "black" : "white"}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Button Title={"LOGIN"} onPress={handleLogin} isLoading={isLoggingIn} />
      </View>
    </View>
  );
}
