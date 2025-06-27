import React, { useRef, useCallback } from "react";
import { Animated, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ScrollAwareFlatList = ({ threshold = 2, ...props }) => {
  const navigation = useNavigation();
  const lastOffsetY = useRef(0);
  const isScrolling = useRef(false);
  const contentHeight = useRef(0);
  const layoutHeight = useRef(0);

  const handleScroll = useCallback(
    ({ nativeEvent }) => {
      if (!isScrolling.current) return;

      if (contentHeight.current <= layoutHeight.current) {
        return; // Don't process scroll if content doesn't overflow
      }

      let offsetY = nativeEvent.contentOffset.y;
      offsetY = Math.max(offsetY, 0); // Clamp bounce/negative scroll

      const deltaY = offsetY - lastOffsetY.current;

      const isAtBottom =
        contentHeight.current - offsetY - layoutHeight.current <= threshold;

      if (deltaY > threshold) {
        // Scroll down
        navigation.setOptions({ tabBarStyle: { display: "none" } });
      } else if ((deltaY < -threshold || offsetY <= threshold) && !isAtBottom) {
        // Scroll up or reached top (but NOT bottom bounce)
        navigation.setOptions({ tabBarStyle: { display: "flex" } });
      }

      lastOffsetY.current = offsetY;
    },
    [navigation, threshold]
  );

  return (
    <AnimatedFlatList
      {...props}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onScrollBeginDrag={() => {
        isScrolling.current = true;
      }}
      onScrollEndDrag={() => {
        // Keep true during momentum
      }}
      onMomentumScrollBegin={() => {
        isScrolling.current = true;
      }}
      onMomentumScrollEnd={() => {
        isScrolling.current = false;
      }}
      onContentSizeChange={(w, h) => {
        contentHeight.current = h;
      }}
      onLayout={(e) => {
        layoutHeight.current = e.nativeEvent.layout.height;
      }}
    />
  );
};

export default ScrollAwareFlatList;
