// src/screen/DocumentManagerScreen/DocumentManagerScreen.jsx
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRootFolders } from "@/store/slices/foldersSlice";
import { View, StyleSheet, ScrollView, useColorScheme } from "react-native";
import { loadAllFiles } from "@/store/slices/fileSlice";
import AllDocumentFileFolderCard from "@/constants/AllDocumentFileFolderCard";
import { darkTheme, lightTheme } from "@/constants/THEME";
import Button from "@/constants/Button";

export default function DocumentManagerScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const folders = useSelector((s) => s.folders.list);
  const files = useSelector((s) => s.files.list);
  const items = [
    ...folders.map((f) => ({ ...f, type: "folder" })),
    ...files.map((f) => ({ ...f, type: "file" })),
  ];

  useEffect(() => {
    dispatch(loadRootFolders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAllFiles());
  }, [dispatch]);

  return (
    <ScrollView
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
      <View style={styles.topButtonContainerOverlay}>
        <Button
          Title={"New Folder"}
          iconName="add"
          width={"37%"}
          onPress={() => navigation.navigate("AddNewFolderScreen")}
        />

        <Button
          Title="Scan"
          iconName="camera"
          onPress={() =>
            navigation.navigate("Dashboard", {
              screen: "Scan",
            })
          }
        />
        <Button
          Title="Upload"
          iconName="cloud-upload"
          onPress={() =>
            navigation.navigate("Dashboard", {
              screen: "Upload",
            })
          }
        />
      </View>

      <View style={{ padding: 16 }}>
        {items.map((item) => (
          <AllDocumentFileFolderCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  topButtonContainerOverlay: {
    padding: 8,
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
