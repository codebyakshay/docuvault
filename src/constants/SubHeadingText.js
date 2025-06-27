import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { darkTheme, lightTheme } from "./THEME";
import ShowAllToggleBtn from "./ShowAllToggleBtn";

export default function SubHeadingText({ title, toggleTitle, onPress }) {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.sectionHeaderContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "baseline",
          height: 20,
        }}
      >
        <Text
          style={[
            {
              fontFamily: lightTheme.fonts.MEDIUM,
              color:
                colorScheme === "dark"
                  ? darkTheme.colors.PRIMARY
                  : lightTheme.colors.PRIMARY,
            },
          ]}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "baseline",
          height: 20,
        }}
      >
        <ShowAllToggleBtn colorScheme={colorScheme} title={toggleTitle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: lightTheme.spacing.MD,

    padding: 4,
  },
});
