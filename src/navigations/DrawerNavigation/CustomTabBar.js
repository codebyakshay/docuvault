import { View, Text, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        bottom: 80,
        left: 30,
        borderRadius: 999,
        zIndex: 99,
        alignItems: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { iconName, iconType } = options;
        const IconComponent = iconType || AntDesign;
        const isFocused = state.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              backgroundColor: isFocused ? "#3b82f6" : "transparent",
              paddingHorizontal: isFocused ? 30 : 0,
              paddingVertical: isFocused ? 5 : 0,
              borderRadius: isFocused ? 100 : 0,
              flexDirection: "row",
              alignItems: "center",
              elevation: isFocused ? 5 : 0,
              marginHorizontal: isFocused ? 10 : 2,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                padding: isFocused ? 12 : 0,

                marginHorizontal: isFocused ? 10 : 0,
              }}
              onPress={() => navigation.navigate(route.name)}
            >
              {isFocused ? (
                <IconComponent name={iconName} size={20} color={"white"} />
              ) : (
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 99,
                    backgroundColor: "lightgrey",
                    padding: 12,
                  }}
                >
                  <IconComponent name={iconName} size={24} color={"black"} />
                </View>
              )}

              {isFocused ? (
                <Text style={{ color: "white", marginLeft: 8 }}>
                  {route.name}
                </Text>
              ) : null}
            </Pressable>
          </Pressable>
        );
      })}
    </View>
  );
}
