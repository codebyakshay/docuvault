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

        <View style={styles.sectionHeaderContainer}>
          <View>
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
              FOLDERS
            </Text>
          </View>
          <View>
            <ShowAllToggleBtn colorScheme={colorScheme} title={"Show All"} />
          </View>
        </View>

        <View style={styles.listContainer}>
          <ScrollAwareFlatList
            numColumns={2}
            contentContainerStyle={styles.middleContainer}
            columnWrapperStyle={styles.rowContainer}
            showsVerticalScrollIndicator={false}
            data={FOLDERS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FolderCard
                title={item.name}
                iconName={item.iconName}
                iconType={item.iconType}
              />
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
