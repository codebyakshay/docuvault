import React, { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRootFolders } from "@/store/slices/foldersSlice";
import { useEffect } from "react";
import {
  View,
  useColorScheme,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { darkTheme, lightTheme } from "@/constants/THEME";
import SearchBar from "@/constants/SearchBar";
import FolderCard from "@/constants/FolderCard/FolderCard";
import SubHeadingText from "@/constants/SubHeadingText";
import { loadAllFiles, loadFilesForFolder } from "@/store/slices/fileSlice";
import FileCard from "@/constants/FileCard/FileCard";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const searchRef = useRef();
  const dispatch = useDispatch();

  const [currentFolderId, setCurrentFolderId] = useState(null);

  const folders = useSelector((state) => state.folders.list);
  const files = useSelector((state) => state.files.list);

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    if (searchRef.current?.closeDropdown) {
      searchRef.current.closeDropdown();
    }
  };

  useLayoutEffect(() => {
    dispatch(loadRootFolders());
  }, [dispatch]);

  useLayoutEffect(() => {
    dispatch(loadAllFiles());
  }, [dispatch]);

  useLayoutEffect(() => {
    dispatch(loadFilesForFolder(currentFolderId));
  }, [dispatch, currentFolderId]);

  return (
    <>
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
              {folders.map((item) => {
                const filesInFolder = files
                  .filter((f) => f.folderId === item.id)
                  .slice(0, 5);
                return (
                  <View key={item.id} style={styles.rowContainer}>
                    <FolderCard
                      title={item.name}
                      iconName={item.iconName}
                      iconType={item.iconType}
                      fileCount={filesInFolder.length}
                      files={filesInFolder}
                    />
                  </View>
                );
              })}
            </View>

            <View style={styles.recentContainer}>
              <SubHeadingText
                title={"Recently Added"}
                toggleTitle={"Show All"}
              />

              <View style={styles.filesContainer}>
                {files.map((file) => (
                  <FileCard
                    key={file.id}
                    title={file.name}
                    preview={file.blobName}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
