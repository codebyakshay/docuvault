// src/screens/SplashScreen/SplashScreen.jsx

import { View, Image, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { storage } from "@/utils/storage";

import { lightTheme, darkTheme } from "@/constants/THEME";
import IMAGES from "@/constants/IMAGES";
import { styles } from "./styles";

export function SplashScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // After 2 seconds, navigate to the appropriate screen
    const hasSeenOnboarding = storage.getBoolean("onboarding_seen");
    const hasAuth = storage.getBoolean("biomatrics");

    const timeout = setTimeout(() => {
      if (!hasSeenOnboarding) {
        navigation.replace("OnBoardingScreen");
      } else if (!hasAuth) {
        navigation.replace("SignupScreen");
      } else {
        navigation.replace("LoginScreen");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView
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
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <View style={styles.topContainer}>
          <View style={styles.topImageContainer}>
            <Image
              source={IMAGES.LOGO[colorScheme]}
              style={{ width: "100%", height: "100%" }}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomImageContainer}>
            <Image
              source={IMAGES.SPLASH[colorScheme]}
              style={styles.bottomImageStyle}
              resizeMode="center"
            />
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
