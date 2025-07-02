import React, { useContext } from "react";
import { View, Text, useColorScheme, Image } from "react-native";
import { styles } from "./styles";
import { darkTheme, lightTheme } from "../THEME";
import { VaultContext } from "@/vault/VaultProvider";

export default function FileCard({
  title = "Test",
  preview,
  tags = ["red", "green", "blue"],
  category = ["Medical"],
}) {
  const colorScheme = useColorScheme();
  const { bucketDir } = useContext(VaultContext);

  // console.log("bucketDir:", bucketDir);

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor:
            colorScheme === "dark"
              ? darkTheme.colors.CARD_BACKGROUND_DARK
              : lightTheme.colors.CARD_BACKGROUND_LIGHT,
        },
      ]}
    >
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: bucketDir + preview }}
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
        />
      </View>

      <View style={{ flexDirection: "column" }}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              {
                color:
                  colorScheme === "dark"
                    ? darkTheme.colors.TEXT_PRIMARY
                    : lightTheme.colors.TEXT_PRIMARY,
              },
            ]}
          >
            {title}
          </Text>
        </View>
        <View style={styles.categoryAndfilersContainer}>
          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "row",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderRadius: 10,
                  paddingVertical: 4,
                  paddingHorizontal: 6,
                }}
              >
                <View
                  style={{
                    backgroundColor: tag,
                    height: 8,
                    width: 8,
                    margin: 4,
                    borderRadius: 99,
                    justifyContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <Text
                  style={{
                    textTransform: "capitalize",
                    fontFamily: lightTheme.fonts.REGULAR,
                    fontSize: lightTheme.spacing.SSM,
                    color:
                      colorScheme === "dark"
                        ? darkTheme.colors.TEXT_SECONDARY
                        : lightTheme.colors.TEXT_SECONDARY,
                  }}
                >
                  {tag}
                </Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
}
