// src/store/slices/fileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAndInsertFile,
  fetchAllFiles,
  fetchFilesInFolder,
  deleteFile,
} from "@/api/fileAPI";

/* ────────────────────────────────────────────────
   Thunk: createFile
   ------------------------------------------------
   • delegates file creation and insertion to API helper
   _______________________________________________ */

export const createFile = createAsyncThunk(
  "files/create",
  async ({ photo, name }, { extra: { db, bucketDir }, rejectWithValue }) => {
    try {
      const row = await createAndInsertFile({ photo, name, bucketDir, db });
      return row; // passes to reducer
    } catch (err) {
      console.error("Error creating file:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const loadAllFiles = createAsyncThunk(
  "files/loadAll",
  async (_, { extra: { db }, rejectWithValue }) => {
    try {
      return await fetchAllFiles(db);
    } catch (err) {
      console.error("Error loading files:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const loadFilesForFolder = createAsyncThunk(
  "files/loadForFolder",
  async (folderId, { extra: { db }, rejectWithValue }) => {
    try {
      return await fetchFilesInFolder(db, folderId);
    } catch (err) {
      console.error("Error loading files for folder:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const removeFile = createAsyncThunk(
  "files/delete",
  async ({ id, blobName }, { extra: { db, bucketDir }, rejectWithValue }) => {
    try {
      await deleteFile(db, bucketDir, id, blobName);
      return id; // pass deleted file id to reducer
    } catch (err) {
      console.error("Error deleting file:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const moveFile = createAsyncThunk(
  "files/move",
  async ({ fileId, targetFolderId }, { extra: { db }, rejectWithValue }) => {
    try {
      await moveFileToFolder(db, fileId, targetFolderId);
      return { fileId, targetFolderId };
    } catch (err) {
      console.error("Error moving file:", err);
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

  // write files-

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

    // read files-
    b.addCase(loadAllFiles.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(loadAllFiles.fulfilled, (s, { payload }) => {
      s.status = "succeeded";
      s.list = payload; // overwrite with DB snapshot
    });
    b.addCase(loadAllFiles.rejected, (s, { payload, error }) => {
      s.status = "failed";
      s.error = payload || error.message;
    });

    // load files for a specific folder

    b.addCase(loadFilesForFolder.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    b.addCase(loadFilesForFolder.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.list = payload; // replace list with only that folder’s files
    });
    b.addCase(loadFilesForFolder.rejected, (state, { payload, error }) => {
      state.status = "failed";
      state.error = payload || error.message;
    });

    // delete file
    b.addCase(removeFile.pending, (state) => {
      state.error = null;
    });
    b.addCase(removeFile.fulfilled, (state, { payload: deletedId }) => {
      state.list = state.list.filter((f) => f.id !== deletedId);
    });
    b.addCase(removeFile.rejected, (state, { payload, error }) => {
      state.error = payload || error.message;
    });

    // move file
    b.addCase(moveFile.fulfilled, (state, { payload }) => {
      const file = state.list.find((f) => f.id === payload.fileId);
      if (file) {
        file.folderId = payload.targetFolderId;
      }
    });
    b.addCase(moveFile.rejected, (state, { payload, error }) => {
      state.error = payload || error.message;
    });
  },
});

export default filesSlice.reducer;
