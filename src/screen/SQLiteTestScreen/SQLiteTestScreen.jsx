import React, { useEffect } from "react";
import { Text, View } from "react-native";
import * as SQLite from "expo-sqlite";

export default function SQLiteTestScreen() {
  useEffect(() => {
    (async () => {
      try {
        // 1. Open (or create) a test database
        const db = await SQLite.openDatabaseAsync("test.db");

        // 2. Create a test table
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS test_table (
            id INTEGER PRIMARY KEY NOT NULL,
            value TEXT
          );
        `);

        // 3. Insert a test row
        await db.runAsync("INSERT INTO test_table (value) VALUES (?);", [
          "Hello SQLite!",
        ]);

        // 4. Read it back
        const rows = await db.getAllAsync("SELECT * FROM test_table;");
        console.log("✅ SQLite rows:", rows);

        // 5. (Optional) Show a native alert or update state instead of console.log
      } catch (e) {
        console.error("❌ SQLite test failed:", e);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Check your console for “✅ SQLite rows:” log</Text>
    </View>
  );
}
