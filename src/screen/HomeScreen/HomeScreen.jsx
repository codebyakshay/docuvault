import React, { useRef } from "react";
import {
  View,
  Text,
  useColorScheme,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "./styles";
import { darkTheme, lightTheme } from "@/constants/THEME";
import SearchBar from "@/constants/SearchBar";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const searchRef = useRef(); // 🔹 create ref

  const handleOutsidePress = () => {
    Keyboard.dismiss(); // 🔹 dismiss keyboard
    if (searchRef.current?.closeDropdown) {
      searchRef.current.closeDropdown(); // 🔹 close dropdown
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View
        style={[
          styles.screen,
          {
            backgroundColor:
              colorScheme === "dark"
                ? darkTheme.colors.BACKGROUND
                : lightTheme.colors.BACKGROUND,
          },
        ]}
      >
        <View style={styles.searchBoxContainer}>
          <SearchBar ref={searchRef} />
        </View>

        <View style={styles.middleContainer}>
          <Text>Hello</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
