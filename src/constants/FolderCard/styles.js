import { StyleSheet } from "react-native";
import { lightTheme } from "../THEME";

export const styles = StyleSheet.create({
  folderContainer: {
    minWidth: 160,
    padding: 8,
    borderRadius: lightTheme.radius.MD,
    alignItems: "center",
  },

  pressed: {
    opacity: 0.5,
  },

  logoContainer: {},

  textContainer: {
    padding: 8,
  },

  text: {
    fontFamily: lightTheme.fonts.REGULAR,
    color: lightTheme.colors.PRIMARY,
    fontSize: lightTheme.spacing.SSM,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
