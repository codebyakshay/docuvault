import { lightTheme } from "@/constants/THEME";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: lightTheme.spacing.SM,
  },

  searchBoxContainer: {},

  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: lightTheme.spacing.MD,

    padding: 4,
  },

  listContainer: {
    marginBottom: 100,
  },

  middleContainer: {
    paddingVertical: lightTheme.spacing.MD,
  },

  rowContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
