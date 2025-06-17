import { lightTheme } from "@/constants/THEME";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: lightTheme.colors.BACKGROUND,
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  topImageConatiner: {
    width: 80,
  },
  bottomConatiner: {
    flex: 4,
    textAlign: "center",
    alignItems: "center",
    padding: lightTheme.spacing.XXXL,
  },

  bottomTextContainer: {},

  bottomText: {
    flexWrap: "wrap",
  },

  bottomTextHeading: {
    fontSize: lightTheme.spacing.XXL,
    color: lightTheme.colors.TEXT_PRIMARY,
    fontFamily: lightTheme.fonts.BOLD,
  },

  bottomTextSubHeading: {
    color: lightTheme.colors.TEXT_SECONDARY,
    fontSize: lightTheme.spacing.MD,
    fontFamily: lightTheme.fonts.REGULAR,
    marginVertical: 20,
  },

  bottomBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: lightTheme.spacing.XXXL,
  },
});
