// src/store/slices/fileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Crypto from "expo-crypto";

import { storeCapturedPhoto } from "@/api/fileAPI";
import { insertFolder, fetchRootFolders } from "@/api/folderAPI";

/**
 * INTERNAL helper
 * Ensures the special “All Documents” folder exists and returns its id.
 * If it already exists (name matches exactly), we reuse it.
 */

async function ensureAllDocsFolder(db) {
  // 1. look for an existing root‑level folder named exactly "All Documents"
  const rows = await db.getAllAsync(
    `SELECT id FROM folders WHERE name = ? AND parentId IS NULL LIMIT 1`,
    ["All Documents"]
  );
  if (rows.length) return rows[0].id;

  // 2. else create it
  const id = await Crypto.randomUUID();
  await insertFolder(db, "All Documents", null); // reuse folderAPI helper
  return id;
}

/* ────────────────────────────────────────────────
   Thunk: createFile
   ------------------------------------------------
   • copies the temp photo into bucketDir
   • ensures the “All Documents” folder exists
   • inserts a row into the files table (defaulting folderId = allDocsId)
   • returns the new file object → reducer adds it to state
   _______________________________________________ */

export const createFile = createAsyncThunk(
  "files/create",
  async ({ photo, name }, { extra: { db, bucketDir }, rejectWithValue }) => {
    try {
      // 1. copy/move blob
      const stored = await storeCapturedPhoto(photo, bucketDir);
      // stored = { id, blobName, dest:path, size, mimeType }

      // 2. ensure root folder
      const allDocsId = await ensureAllDocsFolder(db);

      // 3. insert DB row
      await db.runAsync(
        `INSERT INTO files (id, name, folderId, blobName, size, mimeType, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
        [
          stored.id,
          name || stored.blobName,
          allDocsId,
          stored.blobName,
          stored.size,
          stored.mimeType,
        ]
      );

      return {
        id: stored.id,
        name: name || stored.blobName,
        folderId: allDocsId,
        blobName: stored.blobName,
        size: stored.size,
        mimeType: stored.mimeType,
        createdAt: new Date().toISOString(),
      };
    } catch (err) {
      console.error("Error creating file:", err);
      return rejectWithValue(err.message);
    }
  }
);

/* ───────────────────────── slice ───────────────────────── */
const filesSlice = createSlice({
  name: "files",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(createFile.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(createFile.fulfilled, (s, { payload }) => {
      s.status = "succeeded";
      s.list.unshift(payload);
    });
    b.addCase(createFile.rejected, (s, { payload, error }) => {
      s.status = "failed";
      s.error = payload || error.message;
    });
  },
});

export default filesSlice.reducer;
