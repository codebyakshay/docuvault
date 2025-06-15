import COLORS from "@/constants/COLORS";
import { lightTheme } from "@/constants/THEME";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    // backgroundColor: lightTheme.colors.BACKGROUND,
    flex: 1,
    padding: lightTheme.spacing.SM,
  },
  topViewContainer: {
    flex: 3,
    alignItems: "center",
  },

  onboardImageConatiner: {
    height: 450,
    width: 600,
  },

  bottomViewContainer: {
    flex: 3,
    justifyContent: "center",
    padding: lightTheme.spacing.MD,
  },
  bottomViewText: {
    fontFamily: lightTheme.fonts.REGULAR,
    fontSize: lightTheme.spacing.XXXL,
  },
  bottomViewTextSpecial: {
    fontFamily: lightTheme.fonts.REGULAR,
    fontSize: lightTheme.spacing.XXXL,
    color: lightTheme.colors.ACCENT,
  },

  bottomBtnContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-start",

    padding: lightTheme.spacing.MD,
  },
});
