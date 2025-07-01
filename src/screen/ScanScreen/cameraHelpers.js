// src/screen/ScanScreen/cameraHelpers.js
export function pickBackCamera(devices) {
  if (!devices) return null;
  if (Array.isArray(devices))
    return devices.find((d) => d.position === "back") ?? devices[0] ?? null;
  return devices.back ?? devices.front ?? null;
}
