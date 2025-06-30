import * as SQLite from "expo-sqlite";

export async function openDocuVaultAsync() {
  try {
    const db = await SQLite.openDatabaseAsync("docuvault.db");

    // pragma & schema – run only once
    await db.execAsync(`
      PRAGMA foreign_keys = ON;


      CREATE TABLE IF NOT EXISTS folders (
        id        TEXT PRIMARY KEY NOT NULL,
        name      TEXT NOT NULL,
        parentId  TEXT REFERENCES folders(id) ON DELETE CASCADE,
        createdAt TEXT
      );

      CREATE TABLE IF NOT EXISTS files (
        id        TEXT PRIMARY KEY NOT NULL,
        name      TEXT NOT NULL,
        folderId  TEXT REFERENCES folders(id) ON DELETE CASCADE,
        blobName  TEXT NOT NULL,
        size      INTEGER,
        mimeType  TEXT,
        createdAt TEXT
      );
    `);

    return db;
  } catch (error) {
    console.error("Error initializing SQLite database:", error);
    throw error;
  }
}
