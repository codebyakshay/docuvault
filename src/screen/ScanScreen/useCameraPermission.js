// src/screen/ScanScreen/useCameraPermission.js
import { useState, useEffect } from "react";
import { Camera } from "react-native-vision-camera";

export default function useCameraPermission() {
  const [status, setStatus] = useState("not-determined");

  useEffect(() => {
    (async () => {
      const current = await Camera.getCameraPermissionStatus();
      if (current === "authorized") return setStatus("authorized");

      const requested = await Camera.requestCameraPermission();
      setStatus(requested);
    })();
  }, []);

  return status; // 'authorized' | 'denied' | …
}
