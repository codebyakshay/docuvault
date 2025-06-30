// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "./slices/foldersSlice";

/**
 * To survive React‑Native Fast Refresh, we keep the store in a global.
 * `EXTRA` is a mutable object passed to thunk.extraArgument; we fill it later
 * when VaultProvider knows { db, bucketDir }.
 */
const GLOBAL_KEY = "__DOCUVAULT_REDUX_STORE__";
const EXTRA = {};

function createStore() {
  return configureStore({
    reducer: {
      folders: foldersReducer,
      // add more slices here…
    },
    middleware: (getDefault) =>
      getDefault({
        thunk: {
          extraArgument: EXTRA, // object reference stays stable
        },
      }),
  });
}

// Reuse existing store if Fast Refresh re‑evaluates this module
export const store =
  globalThis[GLOBAL_KEY] ?? (globalThis[GLOBAL_KEY] = createStore());

/**
 * Call exactly once from VaultProvider after opening the DB.
 * Subsequent calls (e.g. another Fast Refresh) just return the same store.
 */
export function initStore(extra) {
  // copy props onto the existing EXTRA object so thunks see them
  Object.assign(EXTRA, extra);
  return store;
}

export function getStore() {
  return store;
}
