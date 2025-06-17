import { View, Image, Text, StyleSheet } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import IMAGES from "@/constants/IMAGES";
import Button from "@/constants/Button";
import RoundLogoButton from "@/constants/RoundLogoButton";
import { TypeAnimation } from "react-native-type-animation";
import { StatusBar } from "expo-status-bar";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export default function OnBoardingScreen({ navigation }) {
  function handleOnPress() {
    storage.set("onboarding_seen", true);
    navigation.replace("SignupScreen");
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: "#ffffff" }]}>
      <StatusBar hidden />

      <LinearGradient
        colors={["rgba(255,255,255,0)", "#ffffff"]}
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
        <Button Title={"Let's Begin"} onPress={handleOnPress} />
      </View>
    </SafeAreaView>
  );
}
