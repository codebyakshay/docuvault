import { View, Image, Text, StyleSheet, useColorScheme } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import IMAGES from "@/constants/IMAGES";
import Button from "@/constants/Button";
import RoundLogoButton from "@/constants/RoundLogoButton";
import { TypeAnimation } from "react-native-type-animation";
import { StatusBar } from "expo-status-bar";
import { storage } from "@/utils/storage";
import { darkTheme, lightTheme } from "@/constants/THEME";

export default function OnBoardingScreen({ navigation }) {
  const colorScheme = useColorScheme();

  function handleOnPress() {
    storage.set("onboarding_seen", true);
    navigation.replace("SignupScreen");
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
      <StatusBar hidden />

      <View style={styles.topViewContainer}>
        <View style={styles.onboardImageConatiner}>
          <Image
            source={IMAGES.ONBOARDING.light}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.bottomViewContainer}>
        <Text
          style={[
            styles.bottomViewText,
            {
              color: colorScheme === "dark" ? "white" : "black",
            },
          ]}
        >
          Welcome
        </Text>
        <Text
          style={[
            styles.bottomViewText,
            {
              color: colorScheme === "dark" ? "white" : "black",
            },
          ]}
        >
          To
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              styles.bottomViewText,
              {
                color: colorScheme === "dark" ? "white" : "black",
              },
            ]}
          >
            Docu
          </Text>
          <TypeAnimation
            sequence={[{ text: "Vault" }, { text: "", delay: 3000 }]}
            speed={80}
            loop
            style={styles.bottomViewTextSpecial}
          />
        </View>
      </View>

      <View style={styles.bottomBtnContainer}>
        <Button Title={"Let's Begin"} onPress={handleOnPress} />
      </View>
    </View>
  );
}
