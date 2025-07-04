import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { lightTheme } from "./THEME";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator } from "react-native-paper";

const Button = ({
  onPress,
  Title,
  width,
  height,
  style,
  iconName = "arrow-forward-ios",
  isLoading = false,
}) => {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.btnContainer,
          pressed && { opacity: 0.6 },
          style,
          width !== undefined && { width },
          height !== undefined && { height },
        ]}
        onPress={onPress}
      >
        {isLoading === true ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.btnText}>{Title}</Text>
            <MaterialIcons name={iconName} size={20} color="black" />
          </>
        )}
      </Pressable>
    </>
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
