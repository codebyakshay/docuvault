import React from "react";
import { Pressable, useColorScheme, View, Text } from "react-native";
import { darkTheme, lightTheme } from "../THEME";
import { styles } from "./styles";
import Logo from "@/../assets/image/folder.svg";
import { randomUUID } from "expo-crypto";

export default function FolderCard({ onPress, title, files }) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.folderContainer,
        pressed && styles.pressed,
        {
          backgroundColor:
            colorScheme === "dark"
              ? darkTheme.colors.CARD_BACKGROUND_DARK
              : lightTheme.colors.CARD_BACKGROUND_LIGHT,
        },
      ]}
    >
      <View style={styles.logoContainer}>
        <Logo width={40} height={40} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>

      <View style={styles.filesListContainer}>
        {files.map((file) => (
          <View key={file + randomUUID()} style={styles.fileContainer}>
            <View
              style={{
                backgroundColor:
                  colorScheme === "dark"
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(0,0,0,0.4)",
                width: 10,
                height: 10,
                borderRadius: 99,
                borderWidth: 0.3,
              }}
            />
            <Text
              style={[
                styles.fileText,
                {
                  color:
                    colorScheme === "dark"
                      ? darkTheme.colors.TEXT_SECONDARY
                      : lightTheme.colors.TEXT_SECONDARY,
                },
              ]}
            >
              {file.name}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
