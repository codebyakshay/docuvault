// src/constants/AllDocumentFileFolderCard.js

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  Image,
  StyleSheet,
  Platform,
  Pressable,
  Alert,
  ActionSheetIOS,
} from "react-native";
import { darkTheme, lightTheme } from "./THEME";
import { VaultContext } from "@/vault/VaultProvider";
import Logo from "../../assets/image/folder1.svg";

import { useDispatch, useSelector } from "react-redux";
import { loadRootFolders, removeFolder } from "@/store/slices/foldersSlice";
import { loadAllFiles, removeFile } from "@/store/slices/fileSlice";
import { useNavigation } from "@react-navigation/native";

export default function AllDocumentFileFolderCard({ item }) {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const files = useSelector((state) => state.files.list);
  const fileCount =
    item.type === "folder"
      ? files.filter((f) => f.folderId === item.id).length
      : null;

  const bg =
    colorScheme === "dark"
      ? darkTheme.colors.CARD_BACKGROUND_DARK
      : lightTheme.colors.CARD_BACKGROUND_LIGHT;

  const { bucketDir } = useContext(VaultContext);

  function handleDelete() {
    if (item.type === "folder") {
      dispatch(removeFolder(item.id));
      dispatch(loadRootFolders());
      dispatch(loadAllFiles());
    } else {
      dispatch(removeFile({ id: item.id, blobName: item.blobName }));
      dispatch(loadRootFolders());
      dispatch(loadAllFiles());
    }
  }

  // show iOS action sheet
  const showIOSMenu = () => {
    const options =
      item.type === "folder"
        ? ["Delete", "Cancel"]
        : ["Move", "Delete", "Cancel"];
    const destructiveIndex = options.indexOf("Delete");
    const cancelIndex = options.indexOf("Cancel");

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: destructiveIndex,
        cancelButtonIndex: cancelIndex,
      },
      (buttonIndex) => {
        const choice = options[buttonIndex];
        if (choice === "Move") {
          navigation.navigate("MoveToFolderScreen", {
            item,
          });
        } else if (choice === "Delete") {
          handleDelete();
          console.log("Delete item:", item);
        }
      }
    );
  };

  // show Android alert
  const showAndroidMenu = () => {
    const buttons = [];
    if (item.type !== "folder") {
      buttons.push({
        text: "Move",
        onPress: () => console.log("Move item:", item),
      });
    }
    buttons.push({
      text: "Delete",
      style: "destructive",
      onPress: handleDelete,
    });
    buttons.push({ text: "Cancel", style: "cancel" });

    Alert.alert("Select action", null, buttons, { cancelable: true });
  };

  const content = (
    <>
      <View style={[styles.container, { backgroundColor: bg }]}>
        {item.type === "folder" ? (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* Icon + Name on the left */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.icon}>
                  <Logo height={24} width={24} />
                </View>
                <Text
                  style={[
                    styles.name,
                    {
                      color:
                        colorScheme === "dark"
                          ? darkTheme.colors.TEXT_SECONDARY
                          : lightTheme.colors.TEXT_SECONDARY,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </View>

              {/* File count on the right */}
              <Text
                style={{
                  fontSize: 12,
                  color:
                    colorScheme === "dark"
                      ? darkTheme.colors.TEXT_SECONDARY
                      : lightTheme.colors.TEXT_SECONDARY,
                }}
              >
                {fileCount} {fileCount === 1 ? "file" : "files"}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Pressable
              onLongPress={() =>
                Platform.OS === "ios" ? showIOSMenu() : showAndroidMenu()
              }
              style={({ pressed }) => [
                pressed && { opacity: 0.6 },
                {
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                },
              ]}
              onPress={() =>
                navigation.navigate("ImagePreviewScreen", { item })
              }
            >
              <Image
                source={{ uri: bucketDir + item.blobName }}
                style={styles.thumb}
              />
              <Text
                style={[
                  styles.name,
                  {
                    color:
                      colorScheme === "dark"
                        ? darkTheme.colors.TEXT_SECONDARY
                        : lightTheme.colors.TEXT_SECONDARY,
                  },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </>
  );

  // wrap in Pressable to handle long‐press
  return (
    <>
      <Pressable
        onLongPress={() =>
          Platform.OS === "ios" ? showIOSMenu() : showAndroidMenu()
        }
      >
        {content}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  icon: {
    marginRight: 12,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
  },
});
