import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, View, Image, useColorScheme } from "react-native";
import HomeScreen from "@/screen/HomeScreen/HomeScreen";
import UploadScreen from "@/screen/UploadScreen/UploadScreen";
import CustomTabBar from "./CustomTabBar";
import ScanScreen from "@/screen/ScanScreen/ScanScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDrawerStatus } from "@react-navigation/drawer";
import IMAGES from "@/constants/IMAGES";
import { darkTheme, lightTheme } from "@/constants/THEME";
import Menu from "@/../assets/image/menu.svg";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      // \\ //

      // SCREEN OPTIONS
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor:
            colorScheme === "dark"
              ? darkTheme.colors.BACKGROUND
              : lightTheme.colors.BACKGROUND,
          elevation: 0,
          shadowOpacity: 0,
        },

        headerRight: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{
              marginRight: 18,
              marginBottom: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Menu size={26} color="white" width="30" height="30" />
          </Pressable>
        ),

        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={{ color: "transparent" }} />
        ),
      })}
    >
      {/*  */}
      {/*  */}
      {/* / */}

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          iconName: "home",
          iconType: AntDesign,
          headerTitleAlign: "center",
          headerTitle: ({}) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={IMAGES.HOMESCREEN[colorScheme]}
                style={{ width: 160, height: 80, resizeMode: "contain" }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          iconName: "document-scanner",
          iconType: MaterialIcons,

          //

          headerTitle: ({}) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={IMAGES.DOCUSCAN[colorScheme]}
                style={{ width: 160, height: 80, resizeMode: "contain" }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          iconName: "drive-folder-upload",
          iconType: MaterialIcons, // import this at the top

          headerTitle: ({}) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={IMAGES.DOCUPLOAD[colorScheme]}
                style={{ width: 160, height: 80, resizeMode: "contain" }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
