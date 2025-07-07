import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  useColorScheme,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-paper";
import Button from "@/constants/Button";
import { styles } from "./styles";
import { darkTheme, lightTheme } from "@/constants/THEME";
import { useDispatch, useSelector } from "react-redux";
import { loadRootFolders, createFolder } from "@/store/slices/foldersSlice";

export default function AddNewFolder({ navigation }) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const colorScheme = useColorScheme();
  const [folderName, setFolderName] = useState("");
  const [isNameTaken, setIsNameTaken] = useState(false);
  const folderList = useSelector((state) => state.folders.list);
  const allFolderNames = useMemo(
    () => folderList.map((f) => f.name),
    [folderList]
  );

  useEffect(() => {
    dispatch(loadRootFolders());
    inputRef.current?.focus();
  }, []);

  async function onSubmitNewFolderName() {
    const trimmed = folderName.trim();
    if (!trimmed) return;
    // check for duplicate name
    if (allFolderNames.includes(trimmed)) {
      setIsNameTaken(true);
      return;
    }
    setIsNameTaken(false);
    try {
      await dispatch(createFolder({ name: trimmed })).unwrap();
      await dispatch(loadRootFolders());
      navigation.goBack();
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  }

  useEffect(() => {
    dispatch(loadRootFolders());
  }, [dispatch]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark"
            ? darkTheme.colors.BACKGROUND
            : lightTheme.colors.BACKGROUND,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          inputRef.current?.blur();
          Keyboard.dismiss();
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.inputContainer}>
            <TextInput
              label="Folder name"
              ref={inputRef}
              error={isNameTaken}
              value={folderName}
              onChangeText={(text) => setFolderName(text)}
            />
          </View>

          <View style={styles.btnContainer}>
            <Button
              Title="Save"
              iconName="check"
              width={170}
              onPress={onSubmitNewFolderName}
            />
            <Button Title="Add another" iconName="add" width={170} />
            <Button
              Title="Cancel"
              iconName=""
              width={170}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
