import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { darkTheme, lightTheme } from "./THEME";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ShowAllToggleBtn({ title, onPress, colorScheme }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
        styles.container,
      ]}
    >
      <Text
        style={[
          styles.textStyle,
          {
            color:
              colorScheme === "dark"
                ? darkTheme.colors.TEXT_SECONDARY
                : lightTheme.colors.TEXT_SECONDARY,
          },
        ]}
      >
        {title}
      </Text>
      <MaterialIcons
        name="arrow-forward-ios"
        size={10}
        color={
          colorScheme === "dark"
            ? darkTheme.colors.TEXT_SECONDARY
            : lightTheme.colors.TEXT_SECONDARY
        }
        style={{ marginLeft: 4 }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: lightTheme.colors.TEXT_SECONDARY,
    fontFamily: lightTheme.fonts.REGULAR,
  },
});
