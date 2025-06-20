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

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const isDrawerOpen = useDrawerStatus() === "open";
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerShown: true,

        headerRight: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{
              marginRight: 18,
              marginBottom: 2,
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
            }}
          >
            {isDrawerOpen || colorScheme === "dark" ? (
              <AntDesign name="menu-fold" size={26} color="white" />
            ) : (
              <AntDesign name="menu-unfold" size={26} color="black" />
            )}
          </Pressable>
        ),

        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={{ color: "transparent" }} />
        ),
      })}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          iconName: "home",
          iconType: AntDesign, // import this at the top

          headerTitle: ({}) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",

                marginTop: 10,
              }}
            >
              <Image
                source={IMAGES.SPLASH[colorScheme]}
                style={{ width: 160, height: 80, resizeMode: "contain" }}
              />
            </View>
          ),

          headerStyle: {
            backgroundColor:
              colorScheme === "dark"
                ? darkTheme.colors.BACKGROUND
                : lightTheme.colors.BACKGROUND,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />

      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          iconName: "document-scanner",
          iconType: MaterialIcons, // import this at the top
        }}
      />

      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          iconName: "drive-folder-upload",
          iconType: MaterialIcons, // import this at the top
        }}
      />
    </Tab.Navigator>
  );
}
