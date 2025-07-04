// src/api/fileAPI.js
import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";
import { insertFolder } from "@/api/folderAPI";

/**
 
 * Ensure that a root‑level folder named “All Documents” exists.
 * Returns the folder's id (creates the folder if necessary).
 */

export async function fetchAllFiles(db) {
  return db.getAllAsync(`SELECT * FROM files ORDER BY createdAt ASC`);
}

export async function storeCapturedPhoto(photo, bucketDir) {
  const id = await Crypto.randomUUID();
  const ext = photo.path.split(".").pop();
  const blobName = `${id}.${ext}`;
  const dest = `${bucketDir}${blobName}`;

  await FileSystem.copyAsync({ from: photo.path, to: dest });

  return {
    id,
    blobName,
    dest,
    size: photo.size ?? null,
    mimeType: `image/${ext}`,
  };
}

export async function ensureAllDocsFolder(db) {
  const rows = await db.getAllAsync(
    `SELECT id FROM folders WHERE name = ? AND parentId IS NULL LIMIT 1`,
    ["All Documents"]
  );
  if (rows.length) return rows[0].id;

  const folder = await insertFolder(db, "All Documents", null);
  return folder.id;
}

export async function insertFileRow(
  db,
  { id, name, folderId, blobName, size, mimeType }
) {
  await db.runAsync(
    `INSERT INTO files (id, name, folderId, blobName, size, mimeType, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
    [id, name, folderId, blobName, size, mimeType]
  );
  return {
    id,
    name,
    folderId,
    blobName,
    size,
    mimeType,
    createdAt: new Date().toISOString(),
  };
}

export async function createAndInsertFile({ photo, name, bucketDir, db }) {
  const stored = await storeCapturedPhoto(photo, bucketDir);
  const allDocsId = await ensureAllDocsFolder(db);

  return insertFileRow(db, {
    id: stored.id,
    name: name || stored.blobName,
    folderId: allDocsId,
    blobName: stored.blobName,
    size: stored.size,
    mimeType: stored.mimeType,
  });
}

/**
 * Read all files in a specific folder.
 * @param db - the SQLite database instance
 * @param folderId - the id of the folder to query
 * @returns array of file rows for that folder
 */

export async function fetchFilesInFolder(db, folderId) {
  return db.getAllAsync(
    `SELECT *
       FROM files
      WHERE folderId = ?
      ORDER BY createdAt ASC`,
    [folderId]
  );
}

export async function deleteFile(db, bucketDir, id, blobName) {
  await db.runAsync(`DELETE FROM files WHERE id = ?`, [id]);

  const fileUri = `${bucketDir}${blobName}`;
  try {
    await FileSystem.deleteAsync(fileUri);
  } catch {
    console.warn(`Couldn’t delete blob at ${fileUri}`);
  }

  return id;
}

export async function moveFileToFolder(db, fileId, targetFolderId) {
  await db.runAsync(`UPDATE files SET folderId = ? WHERE id = ?`, [
    targetFolderId,
    fileId,
  ]);
}
