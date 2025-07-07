import React, { useEffect, useState, useMemo, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  useColorScheme,
  Platform,
  Alert,
  ActionSheetIOS,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/image/folder1.svg";
import { darkTheme, lightTheme } from "@/constants/THEME";
import { useDispatch, useSelector } from "react-redux";
import { loadRootFolders, removeFolder } from "@/store/slices/foldersSlice";
import { loadAllFiles, removeFile } from "@/store/slices/fileSlice";

import { VaultContext } from "@/vault/VaultProvider";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import Button from "@/constants/Button";

export default function DocumentManagerScreen({}) {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const foldersData = useSelector((s) => s.folders.list);
  const filesData = useSelector((s) => s.files.list);
  const navigation = useNavigation();

  const { bucketDir } = useContext(VaultContext);

  const treeData = useMemo(
    () =>
      foldersData.map((folder) => ({
        id: folder.id,
        folderName: folder.name,
        files: filesData
          .filter((f) => f.folderId === folder.id)
          .map((f) => ({ id: f.id, fileName: f.name })),
      })),
    [foldersData, filesData]
  );

  const initialOpen = treeData.reduce((acc, f, idx) => {
    acc[f.id] = idx === 0;
    return acc;
  }, {});

  // Helper functions for context menu
  const showIOSMenu = (item, isFile) => {
    const options = isFile
      ? ["Move", "Delete", "Cancel"]
      : ["Delete", "Cancel"];
    const destructiveIndex = options.indexOf("Delete");
    const cancelIndex = options.indexOf("Cancel");
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: destructiveIndex,
        cancelButtonIndex: cancelIndex,
      },
      (buttonIndex) => {
        if (isFile) {
          if (buttonIndex === destructiveIndex) {
            dispatch(removeFile({ id: item.id, blobName: item.blobName }));
          } else if (buttonIndex === 0) {
            navigation.navigate("MoveToFolderScreen", { item });
          }
        } else {
          if (buttonIndex === destructiveIndex) {
            dispatch(removeFolder(item.id));
          }
        }
        dispatch(loadRootFolders());
        dispatch(loadAllFiles());
      }
    );
  };

  const showAndroidMenu = (item, isFile) => {
    const buttons = isFile
      ? [
          {
            text: "Delete",
            style: "destructive",
            onPress: () =>
              dispatch(removeFile({ id: item.id, blobName: item.blobName })),
          },
          {
            text: "Move",
            onPress: () => navigation.navigate("MoveToFolderScreen", { item }),
          },
          { text: "Cancel", style: "cancel" },
        ]
      : [
          {
            text: "Delete",
            style: "destructive",
            onPress: () => dispatch(removeFolder(item.id)),
          },
          { text: "Cancel", style: "cancel" },
        ];
    Alert.alert("Select action", undefined, buttons, { cancelable: true });
    // after any delete:
    dispatch(loadRootFolders());
    dispatch(loadAllFiles());
  };

  useEffect(() => {
    dispatch(loadRootFolders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAllFiles());
  }, [dispatch]);

  const [open, setOpen] = useState(initialOpen);

  const toggle = (id) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      {/* Top Btns */}
      <View
        style={[
          styles.topButtonContainerOverlay,
          {
            backgroundColor:
              colorScheme === "dark"
                ? darkTheme.colors.BACKGROUND
                : lightTheme.colors.BACKGROUND,
          },
        ]}
      >
        <Button
          Title="New Folder"
          iconName="add"
          width="37%"
          onPress={() => navigation.navigate("AddNewFolderScreen")}
        />
        <Button
          Title="Scan"
          iconName="camera"
          onPress={() => navigation.navigate("Dashboard", { screen: "Scan" })}
        />
        <Button
          Title="Upload"
          iconName="cloud-upload"
          onPress={() => navigation.navigate("Dashboard", { screen: "Upload" })}
        />
      </View>

      <ScrollView
        style={{
          flex: 1,
          padding: 8,
          backgroundColor:
            colorScheme === "dark"
              ? darkTheme.colors.BACKGROUND
              : lightTheme.colors.BACKGROUND,
        }}
      >
        <View style={[styles.container]}>
          {treeData.map((folder) => (
            <React.Fragment key={folder.id}>
              {/* Folder Structure-Name */}
              <Pressable
                style={({ pressed }) => [
                  styles.folderContainer,
                  pressed && { opacity: 0.8 },
                  {
                    backgroundColor:
                      colorScheme === "dark"
                        ? darkTheme.colors.CARD_BACKGROUND_DARK
                        : lightTheme.colors.CARD_BACKGROUND_LIGHT,
                  },
                ]}
                onPress={() => toggle(folder.id)}
                onLongPress={() =>
                  Platform.OS === "ios"
                    ? showIOSMenu(folder, false)
                    : showAndroidMenu(folder, false)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Logo height={24} width={24} />
                  <Text
                    style={[
                      styles.folderName,
                      {
                        color:
                          colorScheme === "dark"
                            ? darkTheme.colors.ACCENT
                            : lightTheme.colors.ACCENT,
                      },
                    ]}
                  >
                    {folder.folderName}
                  </Text>
                </View>

                {/* Files COUNTER */}
                <Text
                  style={[
                    styles.count,
                    {
                      color:
                        colorScheme === "dark"
                          ? darkTheme.colors.TEXT_SECONDARY
                          : lightTheme.colors.TEXT_SECONDARY,
                    },
                  ]}
                >
                  {folder.files.length}{" "}
                  {folder.files.length === 1 ? "file" : "files"}
                </Text>
              </Pressable>

              {/* Files Structure-Name */}
              {open[folder.id] && (
                <View
                  style={{
                    width: "95%",
                    marginLeft: "5%",
                    marginVertical: 4,

                    justifyContent: "center",
                  }}
                >
                  {folder.files.map((file) => {
                    const originalFile = filesData.find(
                      (f) => f.id === file.id
                    );
                    return (
                      <Pressable
                        key={file.id}
                        onPress={() =>
                          navigation.navigate("ImagePreviewScreen", {
                            item: originalFile,
                          })
                        }
                        onLongPress={() =>
                          Platform.OS === "ios"
                            ? showIOSMenu(originalFile, true)
                            : showAndroidMenu(originalFile, true)
                        }
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginVertical: 4,
                          borderWidth: 0.3,
                          borderRadius: 12,
                          padding: 10,
                          borderColor:
                            colorScheme === "dark" ? "white" : "grey",
                        }}
                      >
                        <Image
                          source={{ uri: bucketDir + originalFile.blobName }}
                          style={styles.thumb}
                        />
                        <Text
                          style={[
                            styles.fileName,
                            {
                              color:
                                colorScheme === "dark"
                                  ? darkTheme.colors.TEXT_SECONDARY
                                  : lightTheme.colors.TEXT_SECONDARY,
                            },
                          ]}
                        >
                          {file.fileName}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  folderContainer: {
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 0.3,
    padding: 8,
  },

  folderName: {
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  fileName: {
    fontSize: 18,
    marginVertical: 2,
    marginLeft: 20,
    // backgroundColor: "red",
  },

  thumb: {
    width: 40,
    height: 40,
  },

  count: {
    fontSize: 14,
  },
  topButtonContainerOverlay: {
    padding: 8,
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
