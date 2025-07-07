import Button from "@/constants/Button";
import { loadRootFolders } from "@/store/slices/foldersSlice";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { moveFile, loadAllFiles } from "@/store/slices/fileSlice";

export default function MoveToFolderScreen({ route }) {
  const navigation = useNavigation();
  const { item } = route.params; // ✅ Correct
  const dispatch = useDispatch();
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const folders = useSelector((state) => state.folders.list);

  const moveTargets = folders
    .filter((folder) => folder.id !== item.folderId)
    .map((folder) => ({ id: folder.id, name: folder.name }));

  async function onConfirmMove() {
    if (!selectedFolderId) return;

    await dispatch(
      moveFile({
        fileId: item.id,
        targetFolderId: selectedFolderId,
      })
    );

    dispatch(loadRootFolders());
    dispatch(loadAllFiles());
  }

  useLayoutEffect(() => {
    dispatch(loadRootFolders());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Dropdown
        data={moveTargets}
        labelField="name" // ✅ use 'name' for the visible label
        valueField="id" // ✅ use 'id' as the internal value
        placeholder="Select folder"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
        }}
        containerStyle={{ borderRadius: 8 }}
        itemTextStyle={{ fontSize: 14 }}
        placeholderStyle={{ color: "#999" }}
        value={selectedFolderId}
        onChange={(folder) => setSelectedFolderId(folder.id)}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 24,
        }}
      >
        <Button
          Title="Cancel"
          iconName=""
          width={120}
          onPress={() => navigation.goBack()}
        />
        <Button
          Title="Confirm"
          iconName="check"
          width={120}
          onPress={async () => {
            await onConfirmMove();
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}
