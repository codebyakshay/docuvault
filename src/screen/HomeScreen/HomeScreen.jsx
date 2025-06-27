import React, { useRef } from "react";
import {
  View,
  useColorScheme,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "./styles";
import { darkTheme, lightTheme } from "@/constants/THEME";
import SearchBar from "@/constants/SearchBar";
import FolderCard from "@/constants/FolderCard/FolderCard";
import { FOLDERS } from "@/data/FOLDER";
import ScrollAwareFlatList from "@/constants/ScrollAwareFlatList/ScrollAwareFlatList";
import { Text } from "react-native";
import ShowAllToggleBtn from "@/constants/ShowAllToggleBtn";
import SubHeadingText from "@/constants/SubHeadingText";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const searchRef = useRef();

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    if (searchRef.current?.closeDropdown) {
      searchRef.current.closeDropdown();
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

        <ScrollView>
          <View>
            <SubHeadingText title={"Folders"} toggleTitle={"Show All"} />
          </View>

          <View style={styles.listContainer}>
            {FOLDERS.slice(0, 4).map((item) => (
              <View key={item.id} style={styles.rowContainer}>
                <FolderCard
                  title={item.name}
                  iconName={item.iconName}
                  iconType={item.iconType}
                />
              </View>
            ))}
          </View>

          <View style={styles.recentContainer}>
            <SubHeadingText title={"Recently Added"} toggleTitle={"Show All"} />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
