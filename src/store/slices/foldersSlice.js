// src/store/slices/foldersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRootFolders, insertFolder } from "@/api/folderAPI";

/* ---------- thunks ---------- */

export const loadRootFolders = createAsyncThunk(
  "folders/loadRoot",
  async (_, { extra: { db }, rejectWithValue }) => {
    try {
      return await fetchRootFolders(db);
    } catch (err) {
      console.error("Error loading root folders:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const createFolder = createAsyncThunk(
  "folders/create",
  async ({ name, parentId = null }, { extra: { db }, rejectWithValue }) => {
    try {
      return await insertFolder(db, name, parentId);
    } catch (err) {
      console.error("Error creating folder:", err);
      return rejectWithValue(err.message);
    }
  }
);

/* ---------- slice ---------- */

const foldersSlice = createSlice({
  name: "folders",
  initialState: {
    list: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    /* load */
    b.addCase(loadRootFolders.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(loadRootFolders.fulfilled, (s, { payload }) => {
      s.status = "succeeded";
      s.list = payload;
    });
    b.addCase(loadRootFolders.rejected, (s, { payload, error }) => {
      s.status = "failed";
      s.error = payload || error.message;
    });

    /* create */
    b.addCase(createFolder.pending, (s) => {
      s.error = null;
    });
    b.addCase(createFolder.fulfilled, (s, { payload }) => {
      s.list.unshift(payload);
    });
    b.addCase(createFolder.rejected, (s, { payload, error }) => {
      s.error = payload || error.message;
    });
  },
});

export default foldersSlice.reducer;
