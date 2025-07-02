# 🔐 DocuVault

**DocuVault** is a secure, offline-first document vault built with React Native (Expo). It lets you scan, store, organize, and manage your personal documents (IDs, certificates, bills, etc.) directly on your device—no servers required.

---

## 🎥 Demo

<div align="center">
  <img src="./assets/demos/scan.gif" alt="Scan Demo" width="300" />
  <img src="./assets/demos/managedocs_scan.gif" alt="Manage Docs Demo" width="300" />
</div>

---

## ✨ Key Features

- 🔒 **Offline-First & Encrypted**  
  All data lives locally in SQLite & the device filesystem.

- 📂 **Folder Management**

  - Create, list, delete folders
  - “All Documents” root folder auto-created on first run

- 📷 **Document Scanning**

  - React-native-vision-camera integration
  - Capture, preview, retake, and name scans

- 📁 **File Storage**

  - Saves blobs to a “bucket” directory
  - Metadata persisted in SQLite (id, name, folderId, mimeType, createdAt)

- 🗂️ **Categorization & Filtering**

  - View “Recently Added”
  - Drill into specific folder contents

- 🗑️ **Deletion & Context Menus**

  - Long-press cards to delete or move files/folders
  - Native ActionSheet on iOS & Alert on Android

- 🌓 **Theming**

  - Dark & Light mode support

- 🚀 **Performance**
  - Redux Toolkit slices with async thunks
  - Fast Refresh–safe store rehydration
  - Expo SQLite + FileSystem

---

## 🛠 Tech Stack

- **Framework & Language**: React Native (Expo), JavaScript
- **State Management**: Redux Toolkit
- **Storage**:
  - SQLite (expo-sqlite) for metadata
  - FileSystem (expo-file-system) for blobs
- **Camera**: react-native-vision-camera
- **UI**: React Navigation (stack, drawer, custom tabs), react-native-context-menu-view, react-native-paper
- **Utilities**: expo-crypto for UUIDs, custom hooks & modular design
