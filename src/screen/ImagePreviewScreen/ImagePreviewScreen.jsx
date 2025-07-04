import { View, Text, useColorScheme } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { styles } from "./styles";
import { darkTheme, lightTheme } from "@/constants/THEME";
import { Image } from "react-native";
import { VaultContext } from "@/vault/VaultProvider";

export default function ImagePreviewScreen({ navigation, route }) {
  const colorScheme = useColorScheme();
  const { bucketDir } = useContext(VaultContext);
  // unify incoming params named `file` or `item`
  const data = route.params?.file ?? route.params?.item ?? {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: data.name || "",
    });
  }, [navigation]);

  return (
    <View
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
      <Image
        source={{ uri: bucketDir + data.blobName }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
}
