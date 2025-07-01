import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { lightTheme } from "./THEME";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Button = ({
  onPress,
  Title,
  width,
  height,
  style,
  iconName = "arrow-forward-ios",
}) => {
  return (
    <Pressable
      style={[
        styles.btnContainer,
        style,
        width !== undefined && { width },
        height !== undefined && { height },
      ]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{Title}</Text>
      <MaterialIcons name={iconName} size={20} color="black" />
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    backgroundColor: lightTheme.colors.ACCENT,
    borderWidth: lightTheme.radius.XXS,
    borderRadius: lightTheme.radius.FULL,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: lightTheme.spacing.SM,
    paddingHorizontal: lightTheme.spacing.MD,
  },
  btnText: {
    fontFamily: lightTheme.fonts.REGULAR,
    fontSize: lightTheme.radius.LG,
    color: lightTheme.colors.TEXT_PRIMARY,
  },
});
