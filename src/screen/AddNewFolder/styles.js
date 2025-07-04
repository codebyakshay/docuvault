import { lightTheme } from "@/constants/THEME";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputContainer: {
    padding: lightTheme.spacing.MMD,
  },

  btnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-evenly",
    alignContent: "space-around",
    marginVertical: 10,
  },
});
