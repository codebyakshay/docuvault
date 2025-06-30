// src/vault/VaultProvider.js
import React, { createContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import { openDocuVaultAsync } from "../db";
import { initStore, getStore } from "@/store";
import { Provider as ReduxProvider } from "react-redux";

export const VaultContext = createContext({
  db: null,
  bucketDir: null,
});

export function VaultProvider({ children }) {
  const [vault, setVault] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // 1️⃣ Open (or create) docuvault.db and ensure our schema
        const db = await openDocuVaultAsync();

        // 2️⃣ Determine your “bucket” directory for file blobs
        const bucketDir = FileSystem.documentDirectory;
        //    e.g. file://.../Documents/

        // 3️⃣ Initialize Redux store, passing db & bucketDir as thunk extras
        initStore({ db, bucketDir });

        // 4️⃣ Save into state so children render only once ready
        setVault({ db, bucketDir });
      } catch (err) {
        console.error("Vault initialization failed:", err);
        setError(err);
      }
    })();
  }, []);

  // If initialization failed, show an error
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>
          {`Error initializing app: ${error.message}`}
        </Text>
      </View>
    );
  }

  // While we’re loading the DB, you can return null or a Splash screen
  if (!vault) return null;

  return (
    <VaultContext.Provider value={vault}>
      <ReduxProvider store={getStore()}>{children}</ReduxProvider>
    </VaultContext.Provider>
  );
}
