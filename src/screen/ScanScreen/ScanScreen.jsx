import React, { useState, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  useColorScheme,
} from "react-native";

import { Camera, useCameraDevices } from "react-native-vision-camera";
import Button from "@/constants/Button";
import { darkTheme, lightTheme } from "@/constants/THEME";

import useCameraPermission from "./useCameraPermission";
import { pickBackCamera } from "./cameraHelpers";
import styles from "./styles";
import PreviewAndForm from "./PreviewAndForm";
import { useDispatch } from "react-redux";

import { createFile, loadAllFiles } from "@/store/slices/fileSlice";
import { loadRootFolders } from "@/store/slices/foldersSlice";

export default function ScanScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const dispatch = useDispatch();

  const permission = useCameraPermission(); // ✅ tiny hook

  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [nameOfDocument, setNameOfDocument] = useState("");

  /* on documnet submit  */

  /* hide / show bottom tab */
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: showCamera ? "none" : "flex" },
    });
  }, [navigation, showCamera]);

  /* handlers */
  const openCamera = () => {
    setPhoto(null);
    setShowCamera(true);
  };

  const snap = async () => {
    if (!cameraRef.current) return;
    const p = await cameraRef.current.takePhoto({
      qualityPrioritization: "balanced",
    });
    setPhoto(p);
    setShowCamera(false);
  };

  const onSubmitDocument = async () => {
    if (!photo) return; // nothing to save

    try {
      const trimmed = nameOfDocument.trim();
      await dispatch(createFile({ photo, name: trimmed })).unwrap();

      setPhoto(null);
      setNameOfDocument("");
      await dispatch(loadRootFolders());
      await dispatch(loadAllFiles());
      navigation.goBack();
    } catch (err) {
      console.error("Saving failed:", err);
    }
  };

  const onSubmitAndAddAnother = async (trimmedName) => {
    if (!photo) return;
    try {
      // 1️⃣ save current
      await dispatch(createFile({ photo, name: trimmedName })).unwrap();
      await dispatch(loadRootFolders());
      await dispatch(loadAllFiles());
      // 2️⃣ reset state & re-open camera for next
      setNameOfDocument("");
      setPhoto(null);
      setShowCamera(true);
    } catch (err) {
      console.error("Saving & continuing failed:", err);
    }
  };
  if (showCamera) {
    const device = pickBackCamera(devices);
    if (!device) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Camera not available at the moment </Text>
        </View>
      );
    }

    return (
      <View style={styles.flex}>
        <Camera
          ref={cameraRef}
          device={device}
          isActive
          photo
          style={styles.flex}
        />
        <View style={styles.cameraOverlay}>
          <View style={styles.buttonRow}>
            <Button iconName="camera" Title="Capture" onPress={snap} />
            <Button
              iconName="close"
              Title="Cancel"
              onPress={() => setShowCamera(false)}
            />
          </View>
        </View>
      </View>
    );
  }

  /* ── default branch ── */
  return (
    <View
      style={[
        styles.flex,
        {
          backgroundColor:
            colorScheme === "dark"
              ? darkTheme.colors.BACKGROUND
              : lightTheme.colors.BACKGROUND,
          padding: 12,
        },
      ]}
    >
      <View style={styles.center}>
        {photo ? (
          <>
            <PreviewAndForm
              path={photo.path}
              nameOfDocument={nameOfDocument}
              setNameOfDocument={setNameOfDocument}
              onSubmitDocument={onSubmitDocument}
              onSubmitAndAddAnother={onSubmitAndAddAnother}
            />
            <View style={styles.reTakeAndCancleBtnContainer}>
              <Button iconName="camera" Title="Retake" onPress={openCamera} />
              <Button
                iconName="close"
                Title="Cancel"
                onPress={() => (setShowCamera(false), setPhoto(null))}
              />
            </View>
          </>
        ) : (
          <Button iconName="camera" Title="Scan" onPress={openCamera} />
        )}
      </View>
    </View>
  );
}
