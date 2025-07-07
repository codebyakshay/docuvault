# 🔐 DocuVault

**DocuVault** is a secure, offline-first document vault built with React Native (Expo). It lets you scan, store, organize, and manage your personal documents (IDs, certificates, bills, etc.) entirely on your device—no external servers required.

---

## 🎥 Demo

<div align="center">
  <img src="./assets/demos/new_demo.gif"   alt="DocuVault Demo" width="354" height="768" />
</div>

---

## ✨ Key Features

- 🔒 **Offline-First & Encrypted**  
  All metadata lives in a local SQLite database; scanned blobs live in the device filesystem.

- 📂 **Folder Management**

  - Auto-creates an “All Documents” root folder on first run
  - Create, list, delete folders
  - Expandable folder-tree view with file counts
  - Modal “Add New Folder” sheet

- 📷 **Document Scanning**

  - Integrated with `react-native-vision-camera`
  - Capture → preview → name → save workflow
  - “Save and take another” option for batch scans

- 📁 **File Storage & Viewing**

  - Blobs stored under a private “bucket” directory
  - Metadata (id, name, folderId, mimeType, createdAt) in SQLite
  - Drill into folder contents or view “Recently Added” across all folders
  - Thumbnail preview panels

- 🔀 **Move & Delete Operations**

  - Long-press on folder cards: delete only
  - Long-press on file cards: move or delete
  - Native ActionSheet on iOS; Alert dialog on Android
  - “Move to…” modal screen with dropdown selector

- 🌓 **Theming**

  - Fully supports Dark & Light modes

- 🚀 **Architecture & Performance**
  - Redux Toolkit slices & async thunks (`createAsyncThunk`)
  - Optimistic UI updates & fast‐refresh–safe store rehydration
  - Modular custom hooks (camera permission, navigation hides)

---

## 🛠 Tech Stack

- **Language & Runtime**: JavaScript, React Native (Expo)
- **State Management**: Redux Toolkit
- **Local Storage**:
  - `expo-sqlite` (metadata)
  - `expo-file-system` (scanned image blobs)
- **Camera**: `react-native-vision-camera`
- **UI & Navigation**:
  - React Navigation (Stack, Drawer, custom BottomTabs)
  - `react-native-context-menu-view` for iOS context menus
  - `react-native-paper` inputs
  - Custom dropdown via `react-native-element-dropdown`
- **Utilities**:
  - `expo-crypto` for UUIDs
  - Custom `VaultContext` for bucket path
  - Tailwind-style theming constants

---
