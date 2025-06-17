import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // for search icon
import { MaterialIcons } from "@expo/vector-icons"; // for dropdown arrow

const categories = ["Documents", "Tags"];

const SearchBar = forwardRef((props, ref) => {
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
      <View style={styles.container}>
        <Feather name="search" size={20} color="black" style={styles.icon} />

        <TextInput
          placeholder="Search"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />

        <Pressable
          style={styles.dropdown}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>{selected}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="gray" />
        </Pressable>
      </View>

      {showDropdown && (
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdownMenu}>
            {categories.map((item) => (
              <Pressable
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelected(item);
                  setShowDropdown(false);
                }}
              >
                <Text>{item}</Text>
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
    marginTop: 4,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 4,
    elevation: 4,
  },
  dropdownItem: {
    padding: 10,
    paddingHorizontal: 16,
  },
});
