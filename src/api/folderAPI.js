// src/api/folderAPI.js
import * as Crypto from "expo-crypto";

/* ---------- readers ---------- */

export async function fetchRootFolders(db) {
  return db.getAllAsync(
    `SELECT *
       FROM folders
      WHERE parentId IS NULL
      ORDER BY createdAt DESC`
  );
}

/* ---------- writers ---------- */

export async function insertFolder(db, name, parentId = null) {
  const id = await Crypto.randomUUID();

  await db.runAsync(
    `INSERT INTO folders (id, name, parentId, createdAt)
     VALUES (?, ?, ?, datetime('now'))`,
    [id, name, parentId]
  );

  return { id, name, parentId, createdAt: new Date().toISOString() };
}

export async function deleteFolder(db, id) {
  await db.runAsync(`DELETE FROM folders WHERE id = ?`, [id]);
  return id;
}
