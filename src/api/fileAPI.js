// src/api/fileAPI.js
import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";

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
