import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFolder } from "@/store/slices/foldersSlice";
import { View, Text, StyleSheet, Button } from "react-native";

export default function DocumentManagerScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();

  // Handler to create a new folder
  const handleCreateFolder = () => {
    dispatch(createFolder({ name: "test-2" }));
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Document Manager</Text>
      <Button title="＋ Add Folder" onPress={() => handleCreateFolder()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#007AFF",
  },
});
