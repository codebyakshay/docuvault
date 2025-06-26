import { lightTheme } from "@/constants/THEME";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: lightTheme.spacing.XXL,
  },

  topConatiner: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  topImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 130,
  },

  topTextStyle: {
    fontFamily: lightTheme.fonts.BOLD,
    fontSize: lightTheme.spacing.XXL,
  },

  middleContainer: {
    flex: 1.5,
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
