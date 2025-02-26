import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import courseReducer from "./courseSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCourseReducer = persistReducer(persistConfig, courseReducer);

export const store = configureStore({
  reducer: {
    courses: persistedCourseReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
