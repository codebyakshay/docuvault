// src/screen/DocumentManagerScreen/DocumentManagerScreen.jsx
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRootFolders } from "@/store/slices/foldersSlice";
import { View, StyleSheet, ScrollView, useColorScheme } from "react-native";
import { loadAllFiles } from "@/store/slices/fileSlice";
import AllDocumentFileFolderCard from "@/constants/AllDocumentFileFolderCard";
import { darkTheme, lightTheme } from "@/constants/THEME";

export default function DocumentManagerScreen() {
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
      {items.map((item) => (
        <AllDocumentFileFolderCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});
