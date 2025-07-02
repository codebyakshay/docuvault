import { StyleSheet } from "react-native";
import { lightTheme } from "../THEME";

export const styles = StyleSheet.create({
  cardContainer: {
    padding: 8,
    borderRadius: 8,
    minHeight: 55,
    flexDirection: "row",
  },

  previewContainer: {
    height: 50,
    width: 50,
    padding: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 8,
    borderWidth: 0.3,
  },

  textContainer: {
    marginHorizontal: 10,
  },

  text: {
    fontFamily: lightTheme.fonts.MEDIUM,
    fontSize: lightTheme.spacing.MD,
    textTransform: "capitalize",
  },

  categoryAndfilersContainer: {
    flexDirection: "row",
    gap: 5,
    padding: 8,
  },
});
