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
    gap: 5,
    justifyContent: "center",
  },

  middleContainer: {
    paddingVertical: lightTheme.spacing.MD,
  },

  rowContainer: {
    margin: 8,
  },

  recentContainer: {},
});
