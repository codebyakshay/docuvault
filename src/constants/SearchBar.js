import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // for search icon
import { MaterialIcons } from "@expo/vector-icons"; // for dropdown arrow
import { darkTheme, lightTheme } from "./THEME";

const categories = ["Documents", "Tags"];

const SearchBar = forwardRef((props, ref) => {
  const colorScheme = useColorScheme();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Documents");
  const [showDropdown, setShowDropdown] = useState(false);

  useImperativeHandle(ref, () => ({
    closeDropdown: () => {
      if (showDropdown) setShowDropdown(false);
    },
  }));

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, {}]}>
        <Feather
          name="search"
          size={20}
          color={
            colorScheme === "dark"
              ? lightTheme.colors.CARD_BACKGROUND_DARK
              : darkTheme.colors.CARD_BACKGROUND_LIGHT
          }
          style={styles.icon}
        />

        <TextInput
          placeholder="Search"
          placeholderTextColor={
            colorScheme === "dark"
              ? lightTheme.colors.CARD_BACKGROUND_DARK
              : darkTheme.colors.CARD_BACKGROUND_LIGHT
          }
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />

        <Pressable
          style={styles.dropdown}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>{selected}</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={
              colorScheme === "dark"
                ? lightTheme.colors.CARD_BACKGROUND_DARK
                : darkTheme.colors.CARD_BACKGROUND_LIGHT
            }
          />
        </Pressable>
      </View>

      {showDropdown && (
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View
            style={[
              styles.dropdownMenu,
              {
                backgroundColor:
                  colorScheme === "dark"
                    ? darkTheme.colors.CARD_BACKGROUND_DARK
                    : lightTheme.colors.CARD_BACKGROUND_LIGHT,
              },
            ]}
          >
            {categories.map((item) => (
              <Pressable
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelected(item);
                  setShowDropdown(false);
                }}
              >
                <Text
                  style={[
                    {
                      color:
                        colorScheme === "dark"
                          ? darkTheme.colors.TEXT_SECONDARY
                          : lightTheme.colors.TEXT_SECONDARY,
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
});

export default SearchBar;

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    position: "relative",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 12,
    alignItems: "center",
    height: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderLeftWidth: 1,
    borderColor: "#eee",
  },
  dropdownText: {
    marginRight: 4,
    color: "gray",
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    zIndex: 999,
    width: "100%",
    borderRadius: 12,
    paddingVertical: 4,
    elevation: 4,
  },
  dropdownItem: {
    padding: 10,
    paddingHorizontal: 16,
  },
});
