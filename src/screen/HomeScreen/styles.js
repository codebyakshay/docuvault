import { lightTheme } from "@/constants/THEME";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: lightTheme.spacing.SM,
  },

  searchBoxContainer: {},

  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },

  middleContainer: {
    paddingVertical: lightTheme.spacing.MD,
  },

  rowContainer: {},

  recentContainer: {},

  filesContainer: {
    gap: 5,
    padding: lightTheme.spacing.MD,
  },
});
