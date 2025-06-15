import { View, Image, Text, StyleSheet } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import IMAGES from "@/constants/IMAGES";
import Button from "@/constants/Button";
import RoundLogoButton from "@/constants/RoundLogoButton";
import { lightTheme } from "@/constants/THEME";
import { TypeAnimation } from "react-native-type-animation";
import { StatusBar } from "expo-status-bar";

export default function OnBoardingScreen() {
  return (
    <>
      <StatusBar hidden />
      <LinearGradient
        colors={["transparent", lightTheme.colors.BACKGROUND]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

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
        <Text style={styles.bottomViewText}>Welcome</Text>
        <Text style={styles.bottomViewText}>To</Text>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.bottomViewText}>Docu</Text>
          <TypeAnimation
            sequence={[{ text: "Vault" }, { text: "", delay: 3000 }]}
            speed={80}
            loop
            style={styles.bottomViewTextSpecial}
          />
        </View>
      </View>

      <View style={styles.bottomBtnContainer}>
        <View>
          <Button
            Title={"Let's Begin"}
            onPress={() => console.log("pressed")}
          />
        </View>
        <View style={{ marginHorizontal: lightTheme.spacing.SM }}>
          <RoundLogoButton />
        </View>
      </View>
    </>
  );
}
