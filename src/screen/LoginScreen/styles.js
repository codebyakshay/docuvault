import { lightTheme } from "@/constants/THEME";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: lightTheme.spacing.XXL,
  },

  topConatiner: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  topImageContainer: {
    width: 110,
  },

  topTextStyle: {
    fontFamily: lightTheme.fonts.BOLD,
    fontSize: lightTheme.spacing.XXL,
  },

  middleContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  iconContainer: {
    backgroundColor: lightTheme.colors.INFO,
    borderRadius: lightTheme.radius.FULL,
    padding: lightTheme.spacing.MD,
  },

  bottomContainer: {
    flex: 1.5,
  },
});
