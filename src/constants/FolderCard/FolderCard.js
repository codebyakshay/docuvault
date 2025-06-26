import React from "react";
import { Pressable, useColorScheme, View, Text } from "react-native";
import { darkTheme, lightTheme } from "../THEME";
import { styles } from "./styles";
import Logo from "@/../assets/image/folder.svg";

export default function FolderCard({ onPress, title }) {
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
    </Pressable>
  );
}
