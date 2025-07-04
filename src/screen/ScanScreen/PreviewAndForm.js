// src/components/PreviewAndForm.jsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Button from "@/constants/Button";

/**
 * props
 * ─────
 * path              – file:// URI of the captured photo
 * nameOfDocument    – external state value  (string)
 * setNameOfDocument – external state setter (fn)
 * onSubmitDocumnet(name)    – called when Save tapped and name is non-empty
 */
export default function PreviewAndForm({
  path,
  nameOfDocument,
  setNameOfDocument,
  onSubmitDocument,
  onSubmitAndAddAnother,
}) {
  const trimmed = nameOfDocument?.trim();

  return (
    <View style={styles.container}>
      {/* preview */}
      <View style={styles.photoPreviewContainer}>
        <Image source={{ uri: path }} style={styles.previewImg} />
      </View>

      {/* controlled field */}
      <TextInput
        mode="outlined"
        label="Document name"
        value={nameOfDocument}
        onChangeText={setNameOfDocument}
        left={<TextInput.Icon icon="file-document-outline" />}
        style={styles.input}
      />

      <View style={{ marginVertical: 10 }}>
        <Button
          Title="Save"
          iconName="check"
          onPress={() => onSubmitDocument?.(trimmed)}
          disabled={!trimmed}
        />
        <View style={{ marginVertical: 10 }} />

        <Button
          Title="Save and take another"
          iconName="check"
          onPress={() => onSubmitAndAddAnother?.(trimmed)}
          disabled={!trimmed}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  photoPreviewContainer: {
    alignSelf: "center",
    height: 120,
    width: 120,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
  },
  previewImg: { height: "100%", width: "100%" },
  input: { marginBottom: 16 },
});
