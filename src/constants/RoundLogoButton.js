import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { lightTheme } from "./THEME";

export default function RoundLogoButton({ onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={require("../../assets/image/logoWhite.png")}
        resizeMode="center"
        style={{ width: "100%", height: "100%" }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: lightTheme.radius.XXS,
    borderRadius: lightTheme.radius.FULL,
    height: 48,
    width: 48,
    padding: lightTheme.spacing.SM,
  },
});
