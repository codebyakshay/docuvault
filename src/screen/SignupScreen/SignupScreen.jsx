import { Alert, Image, Text, useColorScheme, View } from "react-native";
import { styles } from "./styles";
import IMAGES from "@/constants/IMAGES";
import { darkTheme, lightTheme } from "@/constants/THEME";
import Button from "@/constants/Button";
import * as LocalAuthentication from "expo-local-authentication";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export default function SignupScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const handleAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supported =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    console.log(enrolled);
    if (hasHardware && supported.length > 0 && enrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Setup authentication to use Docuvault",
        fallbackLabel: "Use Passcode",
        disableDeviceFallback: false,
      });
      console.log(result);
      if (result.success) {
        storage.set("biomatrics", true);
        navigation.replace("MainApp");
      } else {
        // User cancelled or failed auth
        Alert.alert(
          "Vault is locked",
          "You need to setup authentication to access the vault.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Set up", onPress: handleAuth },
          ]
        );
      }
    } else {
      Alert.alert("Authentication not available on this device");
    }
  };

  return (
    <View
      style={[
        styles.conatiner,
        {
          backgroundColor:
            colorScheme === "dark"
              ? darkTheme.colors.BACKGROUND
              : lightTheme.colors.BACKGROUND,
        },
      ]}
    >
      <View style={styles.topContainer}>
        <View style={styles.topImageConatiner}>
          <Image
            source={IMAGES.LOGO[colorScheme]}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.bottomConatiner}>
        <View style={styles.bottomTextContainer}>
          <Text
            style={[
              styles.bottomTextHeading,
              styles.bottomText,
              {
                color:
                  colorScheme === "dark"
                    ? darkTheme.colors.TEXT_PRIMARY
                    : lightTheme.colors.TEXT_PRIMARY,
              },
            ]}
          >
            Sign up with biometrics or Device Authentication
          </Text>

          <Text
            style={[
              styles.bottomTextSubHeading,
              styles.bottomText,
              {
                color:
                  colorScheme === "dark"
                    ? darkTheme.colors.TEXT_PRIMARY
                    : lightTheme.colors.TEXT_PRIMARY,
              },
            ]}
          >
            To access Docu
            <Text
              style={{
                color:
                  colorScheme === "dark"
                    ? darkTheme.colors.ACCENT
                    : lightTheme.colors.ACCENT,
              }}
            >
              vault{" "}
            </Text>
            use your devices existing authentication
          </Text>
        </View>

        <View style={styles.bottomBtnContainer}>
          <Button Title={"SET UP"} onPress={handleAuth} width={200} />
        </View>
      </View>
    </View>
  );
}
