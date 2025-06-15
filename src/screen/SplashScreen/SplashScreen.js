// src/screens/SplashScreen/SplashScreen.jsx

import { Animated } from "react-native";

import {
  View,
  Image,
  StyleSheet,
  useColorScheme,
  Appearance,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme, darkTheme } from "@/constants/THEME";
import IMAGES from "@/constants/IMAGES";
import { useEffect, useState } from "react";
import { styles } from "./styles";

export default function SplashScreen() {
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
              style={styles.imageStyle}
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
