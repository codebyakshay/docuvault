// src/screen/ScanScreen/styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1 },

  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
  buttonRow: { flexDirection: "row", gap: 12 },

  reTakeAndCancleBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  previewImg: {
    width: 300,
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
  },
});
